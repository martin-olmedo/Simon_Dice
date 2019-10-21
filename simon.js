const btnEmpezar = document.getElementById('btnEmpezar')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const ULTIMO_NIVEL = 10

class Juego {
    constructor(){
            this.inicializar = this.inicializar.bind(this)
            this.inicializar()
            this.generarSecuencia()
            setTimeout(() => {
                this.siguienteNivel()
            }, 500);
    }
    inicializar() {
        // console.log('Empieza el juego')
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toogleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta, //es lo mismo que violeta: violeta pero simplificado, como los dos tienen el mismo nombre, no necesito poner el :
            naranja,
            verde
        }
    }
    toogleBtnEmpezar() {
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }
    generarSecuencia() {
        // console.log('genera secuencia')
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4)) //genera un array de 10 elementos - .fill deja todos en cero - .map recorre todos los valores del array y le pone un math.random * 4 (para tener numeros entre  0 y 4) EL .MAP NO SIRVE SI LOS VALORES DEL ARRAY ESTAN VACIOS, POR ESO HAY QUE .FILL ANTES
    }
    siguienteNivel() {
        // console.log('pasa al siguiente nivel')
        this.subNivel = 0
//this.nombreatributo = valor
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
    transformarNumeroAColor(num){
        // console.log('transforma numero a color')
        switch(num){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformarColorANumero(col){
        // console.log('transforma color a numero')
        switch(col){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }
    iluminarSecuencia() {
        // console.log('ilumina la secuencia')
        for (let i = 0; i < this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i]) //aca le digo que por cada numero de la secuencia le asigne un color . let significa que la variable color se mantiene solamente para esa iteracion del for, y para la próxima no es el mismo. Si no, con var, primero se declaran todos los colores y después hace el iluminar color con el último color que se declaró
            setTimeout ( () => this.iluminarColor(color), 1000 * i) //ver en los complementos del curso cuandos se usa var let y const
            }
        }
    iluminarColor(color){
        // console.log('ilumina el color')
        this.colores[color].classList.add('light') //le agrego una clase de CSS para que se ilumine
        setTimeout ( () => this.apagarColor(color), 400)
    }
    apagarColor(color){
        // console.log('apaga el color')
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick() {
        // console.log('toma el evento click')
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick() {
        // console.log('elimina el evento click')
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }
    elegirColor(ev) { //ev es lo que retorna el event listener del click del mouse. haciendole un console.log(ev) me puedo fijar en qué evento se realizó el click
        //aca cambia el this. y pone la mira en quien disparó el evento (this va a ser el color en donde yo hice click). Para que no cambie, tengo que poner el .bind en el addeventlistener (lo corrijo directamente desde el principio, declarando como variable)
        // console.log(ev)
        // console.log(`dice que color se eligió ${ev.target.dataset.color}`)
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if(numeroColor=== this.secuencia[this.subNivel]){
            this.subNivel++
            // console.log('elegiste el color correcto')
            if(this.subNivel === this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                // console.log('pasaste de nivel')
                if(this.nivel === (ULTIMO_NIVEL + 1) ){
                    //ganó
                    this.ganoElJuego()
                }else {
                    setTimeout(this.siguienteNivel, 1000)
                    // console.log('pasaste de nivel')
                }
            }
            }else {
                //perdió
                this.perdioElJuego()
                }
        }
    ganoElJuego() {
        swal('Simon dice:', 'Ganaste el juego!', 'success') //swal es el sweet alert, una especie de alerta que descargo de una libreria. Ver en el html el script previo al simon.js. Para ver la documentacion, visitar la pag de donde se extrae
        .then(this.inicializar()) //es lo mismo que escribirlo como función, porque se tiene que poner como una funcion
    }
    perdioElJuego() {
        swal('Simon dice:', 'Lo lamento, perdiste :(', 'error') //swal es el sweet alert, una especie de alerta que descargo de una libreria. Ver en el html el script previo al simon.js. Para ver la documentacion, visitar la pag de donde se extrae
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        })
    }

}

function empezarJuego() {
    window.juego= new Juego() //crea la variable dentro de window para que podamos verla en el console
}
