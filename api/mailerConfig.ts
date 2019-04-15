export = {
    transport: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'adzio96',
        pass: '5tgbNHY^'
      }
    },
    defaults: {
      forceEmbeddedImages: true,
      from:'"nest-modules" <modules@nestjs.com>',
    },
    templateDir: './src/common/email-templates'
  }