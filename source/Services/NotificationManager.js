import PushNotification from "react-native-push-notification"

  class NotificationManager {

      // Configuração orientada pela documentação do React Native Push Notification
      // Essa configuração garante o funcionamento da biblioteca no Android e no iOS
      configure = () => {
          PushNotification.configure({
              onRegister: function (token) {
                  console.log("[NotificationManager] onRegister token:", token);
                },
              onNotification: function (notification) {
              console.log("[NotificationManager] onNotification:", notification);
              },
          })
      }

      // É aqui que nossa notificação para o Android é construida
      buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
          return {
              id: id,
              autoCancel: true,
              largeIcon: options.largeIcon || "ic_launcher",
              smallIcon: options.smallIcon || "ic_launcher",
              bigText: message || '',
              subText: title || '',
              vibrate: options.vibrate || false,
              vibration: options.vibration || 300,
              priority: options.priority || "high",
              importance: options.importance || "high",
              data: data            
          }
      }

      showNotificationScheduled = () => {
        PushNotification.localNotificationSchedule({
            channelId: 'agendado-id',
            id: 1,
            title: 'Maratona Stranger Things',
            message: "Todos os episódios disponíveis. Não esqueça de deixar sua opinião", // (required)
            date: new Date(Date.now() + 5 * 1000), // in 60 secs
            repeatTime: 2 * 60 * 1000, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
            repeatType: "time"
          });

          PushNotification.localNotificationSchedule({
            channelId: 'agendado-id',
            id: 2,
            title: 'Já comentou sua série hoje?',
            message: "Sua opinião é muito importante", // (required)
            date: new Date(Date.now() + 10 * 1000), // in 60 secs
            repeatTime: 4 * 60 * 1000, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
            repeatType: "time"
          });

          PushNotification.localNotificationSchedule({
            channelId: 'agendado-id',
            id: 3,
            title: 'Curte um filminho antes de dormir?',
            message: "Nicolas Cage quer saber o que achou do filme dele.", // (required)
            date: new Date(Date.now() + 15 * 1000), // in 60 secs
            repeatTime: 6 * 60 * 1000, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
            repeatType: "time"
          });
      }

      // Fução que exibe a notificação
      showNotification = (id, title, message, data = {}, options = {}) => {
          PushNotification.localNotification({
              /* Propriedades do Android */
              ...this.buildAndroidNotification(id, title, message, data, options),

              /* Propriedades do Android e iOS */
              channelId: 'agendado-id',
              title: title || "",
              message: message || "",
              playSound: options.playSound || false,
              soundName: options.soundName || 'default',
              userInteraction: false
          })
      }

      // Função que cancela todas notiificações e limpa as que estão no centro de notificações
      cancelAllLocalNotification = () => {
          PushNotification.cancelAllLocalNotifications();
      }

      createChannel = () => {
        PushNotification.createChannel(
            {
              channelId: "agendado-id", // (required)
              channelName: "Notificações agendadas", // (required)
              channelDescription: "canal das notificações agendadas", // (optional) default: undefined.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
          );
      }

  }

  export const notificationManager = new NotificationManager();