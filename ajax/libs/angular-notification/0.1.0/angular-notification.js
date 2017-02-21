/*! Angular notification v0.1.0 | (c) 2013 Greg Bergé | License MIT */

angular
.module('notification', [])
.provider('Notification', NotificationProvider);

/**
 * Notification provider.
 * Configure the default notification options.
 */

function NotificationProvider() {
  var provider = this;

  /**
   * Expose Notification service.
   */

  this.$get = ['$window', '$rootScope', notificationService];

  /**
   * Create a new Notification service.
   */

  function notificationService($window, $rootScope) {

    /**
     * Check notification support.
     * Throws an error if notification are not supported.
     */

    function checkSupport() {
      if (! $window.Notification)
        throw new Error('This browser does not support desktop notification.');
    }

    /**
     * Create a new Notification.
     *
     * @param {String} title
     * @param {Object} options
     */

    function NgNotification(title, options) {
      options = options || {};

      var self = this;

      checkSupport();

      // Events cache.
      this._events = [];

      /**
       * Create the notification.
       */

      function createNotification() {
        // Extend options with default provider options.
        angular.extend(options, provider.options || {});

        // Create a base notification.
        self.baseNotification = new $window.Notification(title, options);

        // Close notification after specified delay.
        if (options.delay) setTimeout(angular.bind(self, self.close), options.delay);

        // Re-bind events.
        self._events.forEach(function (args) {
          self.$on.apply(self, args);
        });

        // Reset events.
        self._events = [];
      }

      if ($window.Notification.permission === 'granted')
        return createNotification();
      else if ($window.Notification.permission !== 'denied')
        NgNotification.requestPermission(createNotification);
    }

    /**
     * Listen on event of a given type.
     * Supported events are:
     * - error
     * - show
     * - click
     * - close
     *
     * @param {String} name
     * @param {Function} listener
     */

    NgNotification.prototype.$on = function $on(name, listener) {
      // If the notification is not ready, we cache the event.
      if (! this.baseNotification) return this._events.push([name, listener]);

      this.baseNotification.addEventListener(name, applyListener);

      function applyListener() {
        var args = arguments;
        $rootScope.$apply(function () {
          listener.apply(null, args);
        });
      }

       // Return the deregistration function.
      return function $off() {
        this.baseNotification.removeListener(event, applyListener);
      };
    };

    /**
     * Close the notification.
     */

    NgNotification.prototype.close = function close() {
      if (this.baseNotification) this.baseNotification.close();
    };

    /**
     * Static method to request permission.
     *
     * @param {Function} callback
     */

    NgNotification.requestPermission = function (callback) {
      checkSupport();

      $window.Notification.requestPermission(function (permission) {
        // Persist permission.
        $window.Notification.permission = $window.Notification.permission || permission;
        callback(permission);
      });
    };

    return NgNotification;
  }

  /**
   * Define default options.
   *
   * @param {Object} options
   */

  this.setOptions = function setOptions(options) {
    this.options = options;
  };
}