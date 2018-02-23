'use strict';


    $('#choices').selectmenu({
        select: function(event, ui) {
            localStorage.setItem('choice', ui.item.value);
                window.location.href = 'pane.html';
            }     
});

