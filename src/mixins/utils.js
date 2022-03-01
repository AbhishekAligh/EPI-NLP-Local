import $ from 'jquery'

export default {
  methods: {
    msToTimeFull: function(duration) {
      var minutes = new Date(duration).getMinutes(),
        hours = new Date(duration).getHours();

      minutes = (minutes < 10) ? "0" + minutes : minutes;

      return (hours>12 ? hours - 12: hours) + ":" + minutes + (hours>=12 ? "PM": "AM");
    },
    convertDateToString: function(date) {
      var dt = new Date(date),
        month = dt.getMonth() + 1,
        day = dt.getDate(),
        year = dt.getFullYear();

      if( month < 10 ) {
        month = "0" + month;
      }

      if( day < 10 ) {
        day = "0" + day;
      }

      return (month + "/" + day + "/" + year);
    },
    convertDateToStringTime: function(date) {
      var dt = new Date(date);
      return (
        dt.getMonth() + 1 + "/" +
				(dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate()) + "/" +
				dt.getFullYear() + " " + this.msToTime(dt)
      );
    },
    msToTime: function(time) {
      var minutes = new Date(time).getMinutes(),
        hours = new Date(time).getHours();

      minutes = minutes < 10 ? "0" + minutes : minutes;

      return (
        (hours > 12 ? hours - 12 : hours) +":" + minutes + (hours >= 12 ? "PM" : "AM")
      );
    },
    timeSince: function(date) {
      var seconds = Math.floor((new Date() - date) / 1000),
        interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }

      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }

      interval = Math.floor(seconds / 604800);
      if (interval > 1) {
        return interval + " weeks";
      }

      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }

      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }

      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    },
    openStub(id) {
      window.open("/" + id);
    },
    /**
     * Splits date string into day, month & year
     * @param  {String} date date string
     * @return {String[]} month, day & year as String objects in a String array
     */
    splitDate(date) {
      return new Date(date).toLocaleDateString("en-US").split("/");
    },
    versionCompareTo(JSONVersion, providedVersion) {
      if (!providedVersion) {
        return 1;
      }

      if (providedVersion.startsWith("V")) {
        providedVersion = providedVersion.slice(1);
      }

      let JSONVersionParts = JSONVersion.split("."),
        providedVersionParts = providedVersion.split("."),
        length = Math.max(JSONVersionParts.length, providedVersionParts.length);

      for (let i = 0; i < length; i++) {
        let JSONVersionPart = JSONVersionParts[i] ? Number(JSONVersionParts[i]) : 0,
          provideVersionPart = providedVersionParts[i] ? Number(providedVersionParts[i]) : 0;

        if (JSONVersionPart < provideVersionPart) {
          return -1;
        } else if (JSONVersionPart > provideVersionPart) {
          return 1;
        }
      }

      return 0;
    },
    getDxCodeDisplay(h) {
      if (h.dxCategory) {
        return `${h.code1} (${h.dxCategory})`;
      } else {
        return `${h.code1}`;
      }
    },
    hasComboCodes(dx) {
      var context = dx.dxContext.toLowerCase();
      return context.startsWith("**possible combo codes");
    },
    bindKeyboardShortcuts(document, vm) {
      document.addEventListener("keydown", (e) => {
        let hasFunction = false;
        switch (e.keyCode) {
        case 80: // p
          if (e.ctrlKey) {
            vm.$eventBus.$emit("toggle-fit-mode");
            hasFunction = true;
          }
          break;
        case 81: // q
          if (e.ctrlKey) {
            vm.$eventBus.$emit("toggle-thumbnail-panel");
            hasFunction = true;
          }
          break;
        case 40: // arrow down
          if (e.shiftKey && e.ctrlKey) {
            vm.$eventBus.$emit("change-page", "last");
            hasFunction = true;
          }
          break;
        case 38: // arrow up
          if (e.shiftKey && e.ctrlKey) {
            vm.$eventBus.$emit("change-page", "first");
            hasFunction = true;
          }
          break;
        case 39: // arrow right
          if (e.shiftKey && e.ctrlKey) {
            vm.$eventBus.$emit("change-page", "last");
          } else if (e.ctrlKey) {
            vm.$eventBus.$emit("goto-next-highlight-page");
          } else {
            vm.$eventBus.$emit("change-page", "next");
          }
          hasFunction = true;
          break;
        case 37: // arrow left
          if (e.shiftKey && e.ctrlKey) {
            vm.$eventBus.$emit("change-page", "first");
          } else if (e.ctrlKey) {
            vm.$eventBus.$emit("goto-previous-highlight-page");
          } else {
            vm.$eventBus.$emit("change-page", "prev");
          }
          hasFunction = true;
          break;
        case 187: // =
          // alt - rotate
          if (e.ctrlKey && e.shiftKey) {
            vm.$eventBus.$emit("rotate", true);
            hasFunction = true;
          }
          // shift = zoom in
          else if (e.ctrlKey) {
            vm.$eventBus.$emit("adjust-zoom", 0.1);
            hasFunction = true;
          }
          break;
        case 189: //-
          // alt - rotate
          if (e.ctrlKey && e.shiftKey) {
            vm.$eventBus.$emit("rotate", false);
            hasFunction = true;
          }
          // shift - zoom out
          else if (e.ctrlKey) {
            vm.$eventBus.$emit("adjust-zoom", -0.1);
            hasFunction = true;
          }
          break;
        case 49:
          // 1 - go to 1st highlighted page
          if (e.ctrlKey && vm.pageWithHighlights.length > 0) {
            vm.$eventBus.$emit("goto-first-highlighted-page");
            hasFunction = true;
          }
          break;
        case 72:
          // h - toggle highlight
          if (e.ctrlKey) {
            vm.$eventBus.$emit("toggle-highlights");
            hasFunction = true;
          }
          break;
        case 71:
          // g - go to page -- set focus on page num input
          if (e.ctrlKey) {
            $(".pageCountInput").focus();
            hasFunction = true;
          }
          break;
        case 66:
          // b - bookmarks
          if (e.ctrlKey && e.altKey) {
            vm.$eventBus.$emit("show-bookmark-panel");
            hasFunction = true;
          }
          break;
        case 70:
          // f - close search
          if (e.ctrlKey && e.shiftKey) {
            vm.$eventBus.$emit("close-search-panel");
            hasFunction = true;
          }
          break;
        case 84:
          // t - thumbnails
          if (e.ctrlKey && e.altKey) {
            vm.$eventBus.$emit("show-thumbnail-panel");
          }
          break;
        case 68:
          // d - expand/collapse rhsp
          if (e.ctrlKey) {
            vm.$eventBus.$emit("toggle-rhsp");
            hasFunction = true;
          }
          break;
        default:
          break;
        }

        if (hasFunction) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    },
  },
};
