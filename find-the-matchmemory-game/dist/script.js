;{
  let
  selected1,
  selected2;

  // http://unicode.org/emoji/charts/full-emoji-list.html
  const iconFruits = [
    '🍇',
    '🍈',
    '🍉',
    '🍊',
    '🍋',
    '🍌',
    '🍍',
    '🍎',
    '🍏',
    '🍑',
    '🍒',
    '🍓',
  ];
  let icons = iconFruits; 

    const iconDrinks = [
        '🍺',
        '🍸',
        '🧃',
        '🍾',
        '🍼',
        '☕',
        '🍷',
        '🥃',
        '🥤',
        '🍶',
        '🥛',
        '🥂',
    ];

    const iconTransport = [
        '🛶',
        '⛵',
        '🛳',
        '✈',
        '🚠',
        '🚀',
        '🛹',
        '🛵',
        '🚚',
        '🚜',
        '🚓',
        '🚑',
    ];

  const app = angular
      .module('app', ['ngRoute', 'ngAnimate', 'ngTouch'])
      .controller('AppController', AppController);

  AppController.$inject = ['$scope', '$timeout', '$animate'];
  function AppController($scope, $timeout, $animate) {

    const vm = this;

    $timeout(() => {
      $scope.appReady = true;
    });

    function showAllCards() {
      $scope.list.forEach(card => {
        $("#card-" + card.id).flip(true);
      });
    }

    function startNewGame() {

      shuffleArray(icons);         

      $animate.enabled(false); 

      $scope.list = [];
             
      let list = [],
      cardCount = 16;
      for (var i = 1; i <= cardCount; i++) {
        let type = i % (cardCount / 2) + 1;
        list.push({
          id: i,
          type: type,
          icon: icons[type - 1],
          theme: 'theme' + type,
          isKnown: false });

      }

      shuffleArray(list); 

      selected1 = selected2 = null;
      $scope.clickCount = 0;

      $scope.cardsLeft = list.length;
      $scope.gameCompleted = false;
      $scope.titleAction = () => {};
      $scope.changeIcons = () => {
        icons = icons === iconFruits ? iconFruits : iconFruits;
      };

      $timeout(() => {
        
        $animate.enabled(true); 

        $scope.list = list;

        $timeout(() => {
         
          let $card = $(".app__cards-container__card");
          $card.flip({
            axis: 'y',
            trigger: 'manual',
            reverse: true },
          () => {
            
          });
       
        });
      });
    }

    $scope.clickCount = 0;
    $scope.cardsLeft = 0;
    $scope.gameCompleted = false;
    $scope.restart = () => {
      startNewGame();
    };

    $scope.click = function (card, index) {

      if (card.flipped) return; 

      $scope.clickCount++;
      
      card.flipped = true;
      selected2 = selected1;
      selected1 = card;
              
      $("#card-" + card.id).flip(true); 

      if (selected1 && selected2 && selected1.type === selected2.type) {
     
        $scope.list.splice($scope.list.indexOf(selected1), 1);
        $scope.list.splice($scope.list.indexOf(selected2), 1);
        selected1 = selected2 = null;

        $scope.cardsLeft = $scope.list.length;

        if ($scope.list.length === 0) {
          $scope.gameCompleted = true;
        }

        return;
      }

      if (selected2) {

        let id = selected2.id;
        (id => {
          $timeout(() => {
            $scope.list.forEach(card => {
              if (card.id === id) {
                card.flipped = false;
                card.isKnown = true;
              }
            });

            $("#card-" + id).flip(false); 

          }, 800);
        })(id);
      }
    };

    startNewGame();
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

};