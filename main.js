const MAX_SQUARES = 8;
let AmountOfSquares = 0;
let CorrectlySelectedSquares = 0;

let CONTAINER = document.querySelector('.memory-wrapper');
let Actives = [];
let CanClick = false;


// CONTAINER.style.display = 'none';

function SetupMemoryGame() {
    CONTAINER.innerHTML = '';
    CONTAINER.style.display = 'none';

    CanClick = false;
    $('.memory-container').css('display', 'none');

    [].forEach.call(document.querySelectorAll('.box-active'), function(element) {
        element.classList.remove('box-active');
    });

    $('.text').html('Preparing hack...')
    $('.help-text').fadeIn(100, () => {
        $('.memory-container').fadeIn(1000)
        setTimeout(() => {
            $('.text').html('Breaching systems...')
            setTimeout(() => {
                $('.help-text').fadeOut(0)
                $('.memory-wrapper').fadeIn(500);
                // CONTAINER.style.opacity = '100';

                for (let i = 1; i < 7; i++) {
                    let row = document.createElement('div');
                    row.classList.add('row');
            
                    for (let k = 1; k < 7; k++) {
                        let square = document.createElement('div');
                        square.classList.add('box');
                        let id = `${i}-${k}`;
                        square.setAttribute('id', id);
            
                        if (RandomNum(1, 5) == 3 && (AmountOfSquares < MAX_SQUARES)) {
                            AmountOfSquares++;
                            square.classList.add('box-active');
                            Actives[id] = true;
                        }
            
                        square.addEventListener('click', ClickSquare)
            
                        row.appendChild(square);
                    }
            
                    CONTAINER.appendChild(row);
                }
            
                setTimeout(() => {
                    CONTAINER.style.opacity = '0';
            
                    setTimeout(() => {
                        [].forEach.call(document.querySelectorAll('.box-active'), function(element) {
                            element.classList.remove('box-active');
                        });
                
                        setTimeout(() => {
                            CONTAINER.style.opacity = '100';
                            CanClick = true;
                        }, 2000);
                    }, 2500);
                }, 5000);
            
                CONTAINER.style.display = 'inline-block';
            }, 4500);
        }, 4000);
    });

}

function RandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
} 

function ClickSquare(e) {
    if (!CanClick) return;

    let ClickedId = e.target.id;

    if (Actives[ClickedId]) {
        CanClick = false;
        CorrectlySelectedSquares++;

        Actives[ClickedId] = false;
        this.style.background = 'white';

        if (CorrectlySelectedSquares >= AmountOfSquares) {
            setTimeout(() => {
                CanClick = false;
                $('.help-text').html('Hack success');

                $('.memory-wrapper').fadeOut(250, () => {
                    $('.help-text').fadeIn(250);
                });
            }, 1000);
        } else {
            CanClick = false;
        }
    } else {
        CanClick = false;
        $('.help-text').html('Hack failed');

        $('.memory-wrapper').fadeOut(250, () => {
            $('.help-text').fadeIn(250);
        });
    }
    
}

SetupMemoryGame();