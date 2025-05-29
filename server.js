const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? ['https://your-domain.com']
      : ['http://localhost:3000'],
    methods: ['GET', 'POST']
  }
})

// Store active users and project rooms
const activeUsers = new Map()
const projectRooms = new Map()

io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId
  console.log(`👋 User ${userId} connected`)

  // Store user info
  activeUsers.set(socket.id, {
    userId,
    socketId: socket.id,
    joinedAt: new Date()
  })

  // Join user to their personal room
  socket.join(`user:${userId}`)

  // Broadcast user joined
  socket.broadcast.emit('user:joined', {
    userId,
    timestamp: new Date()
  })

  // Handle joining project rooms
  socket.on('project:join', ({ projectId }) => {
    socket.join(`project:${projectId}`)

    if (!projectRooms.has(projectId)) {
      projectRooms.set(projectId, new Set())
    }
    projectRooms.get(projectId).add(userId)

    console.log(`📁 User ${userId} joined project ${projectId}`)

    socket.to(`project:${projectId}`).emit('user:joined', {
      userId,
      projectId,
      timestamp: new Date()
    })
  })

  // Handle leaving project rooms
  socket.on('project:leave', ({ projectId }) => {
    socket.leave(`project:${projectId}`)

    if (projectRooms.has(projectId)) {
      projectRooms.get(projectId).delete(userId)
    }

    console.log(`📁 User ${userId} left project ${projectId}`)

    socket.to(`project:${projectId}`).emit('user:left', {
      userId,
      projectId,
      timestamp: new Date()
    })
  })

  // Handle task updates
  socket.on('task:update', ({ taskId, update, userId: updateUserId }) => {
    console.log(`📋 Task ${taskId} updated by ${updateUserId}`)

    socket.broadcast.emit('task:updated', {
      taskId,
      update,
      updatedBy: updateUserId,
      timestamp: new Date()
    })

    if (update.projectId) {
      socket.to(`project:${update.projectId}`).emit('task:updated', {
        taskId,
        update,
        updatedBy: updateUserId,
        timestamp: new Date()
      })
    }
  })

  // Handle new task creation
  socket.on('task:create', ({ task, userId: creatorId }) => {
    console.log(`✨ New task created by ${creatorId}`)

    socket.broadcast.emit('task:created', {
      task,
      createdBy: creatorId,
      timestamp: new Date()
    })

    if (task.projectId) {
      socket.to(`project:${task.projectId}`).emit('task:created', {
        task,
        createdBy: creatorId,
        timestamp: new Date()
      })
    }
  })

  // Handle project updates
  socket.on('project:update', ({ projectId, update, userId: updateUserId }) => {
    console.log(`📊 Project ${projectId} updated by ${updateUserId}`)

    io.to(`project:${projectId}`).emit('project:updated', {
      projectId,
      update,
      updatedBy: updateUserId,
      timestamp: new Date()
    })
  })

  // Handle new comments
  socket.on('comment:add', ({ taskId, comment, userId: authorId }) => {
    console.log(`💬 New comment on task ${taskId} by ${authorId}`)

    socket.broadcast.emit('comment:added', {
      taskId,
      comment,
      author: authorId,
      timestamp: new Date()
    })
  })

  // Handle notifications
  socket.on('notification:send', ({ targetUserId, notification }) => {
    io.to(`user:${targetUserId}`).emit('notification:new', {
      ...notification,
      timestamp: new Date()
    })
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`👋 User ${userId} disconnected`)

    activeUsers.delete(socket.id)

    for (const [projectId, users] of projectRooms.entries()) {
      if (users.has(userId)) {
        users.delete(userId)
        socket.to(`project:${projectId}`).emit('user:left', {
          userId,
          projectId,
          timestamp: new Date()
        })
      }
    }

    socket.broadcast.emit('user:left', {
      userId,
      timestamp: new Date()
    })
  })

  // Send current active users
  socket.emit('users:active', {
    count: activeUsers.size,
    users: Array.from(activeUsers.values())
  })
})

const PORT = process.env.SOCKET_PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on port ${PORT}`)
})
