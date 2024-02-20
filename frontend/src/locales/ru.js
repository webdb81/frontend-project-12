const resources = {
  ru: {
    translation: {
      errors: {
        loginForm: {
          unauthorized: 'Неверные имя пользователя или пароль',
        },
        modalsValidation: {
          required: 'Обязательное поле',
          rangeLength: 'От 3 до 20 символов',
          unique: 'Должно быть уникальным',
        },
        signupForm: {
          required: 'Обязательное поле',
          rangeLength: 'От 3 до 20 символов',
          minLength: 'Не менее {{count}} символов',
          matchingPasswords: 'Пароли должны совпадать',
          unique: 'Должно быть уникальным',
          userExists: 'Такой пользователь уже существует',
        },
      },

      loading: 'Загрузка...',

      header: {
        site: 'Hexlet Chat',
        signoutButton: 'Выйти',
      },

      loginForm: {
        title: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
        submitButton: 'Войти',
        noAccount: 'Нет аккаунта?',
        registration: 'Регистрация',
      },

      signupForm: {
        title: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        signupButton: 'Зарегистрироваться',
      },

      chatPage: {
        messageInput: 'Введите сообщение',
        messageNew: 'Новое сообщение',
        channelsTitle: 'Каналы',
        channelManagement: 'Управление каналом',
        plus: '+',
        messagesNumber: {
          msg_one: '{{count}} сообщение',
          msg_few: '{{count}} сообщения',
          msg_many: '{{count}} сообщений',
        },
      },

      notFoundPage: {
        title: 'Страница не найдена',
        text: 'Перейти',
        linkMainPage: 'на главную страницу',
      },

      modals: {
        cancelButton: 'Отменить',
        submitButton: 'Отправить',
        channelName: 'Имя канала',
        addChannel: {
          title: 'Добавить канал',
        },
        removeChannel: {
          event: 'Удалить',
          title: 'Удалить канал',
          confirm: 'Уверены?',
          submitButton: 'Удалить',
        },
        renameChannel: {
          event: 'Переименовать',
          title: 'Переименовать канал',
        },
      },

      toast: {
        error: {
          network: 'Ошибка соединения',
          dataLoad: 'Ошибка в загрузке данных',
        },
        channel: {
          created: 'Канал создан',
          renamed: 'Канал переименован',
          removed: 'Канал удалён',
        },
      },
    },
  },
};

export default resources;
