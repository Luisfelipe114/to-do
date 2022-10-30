function Tarefa(id, value) {
    this.checked = false;
    this.id = id;
    this.value = value;
}

let tarefas = Array();
var alerta = document.getElementById('alert')
let listaTarefa = document.createElement("ul");
let id = 0;

function marcarTarefa() {
    let marcados = document.getElementsByName('item')
    
    let marcar = document.getElementsByClassName('lista')
    
    for ( let l = 0; l < marcados.length; l++) {
        if(marcados[l].checked) {
            marcar[l].style.textDecoration = 'line-through'  
        } else {
            marcar[l].style.textDecoration = 'none'
        }
    }
}

function adicionarTarefa() {
    let a = document.getElementById('tarefa').value;
    if( a === '') {
        alerta.classList.add('alert', 'alert-danger')
        alerta.innerHTML = 'Insira algo válido' 
    } else {
        alerta.innerHTML = ''
        alerta.classList.remove('alert', 'alert-danger')
        let tarefa = new Tarefa(id, a);

        tarefas.unshift(tarefa);
        a = document.getElementById('tarefa').value = ''
        id++;
        console.log(tarefa.value ,tarefa.id, tarefa.checked);
        gerarElemento1();
    }
}

function gerarElemento() {
    let itemTarefa = document.createElement("li");
    let inputTarefa = document.createElement("input");
    let txtTarefa = document.createTextNode(tarefas[0].value);
    [inputTarefa.type, inputTarefa.name, inputTarefa.className, itemTarefa.className] = ["checkbox", "item", "itens", "lista"];

    [inputTarefa.id, inputTarefa.value] = [tarefas[0].id, tarefas[0].id];

    inputTarefa.addEventListener("click", marcarTarefa)
    itemTarefa.append(txtTarefa, inputTarefa);
    listaTarefa.appendChild(itemTarefa);
    document.getElementById('novas_tarefas').appendChild(listaTarefa);
    marcarTarefa();
}

function removerTarefa() {

    if(tarefas == '') {
        alerta.classList.add('alert', 'alert-danger')
        alerta.innerHTML = 'Nenhuma tarefa adicionada'
    } else {
        alerta.innerHTML = ''
        alerta.classList.remove('alert', 'alert-danger')

        //obter os input checkbox
        let marcados = document.getElementsByName('item');
        let auxiliaMarcados = Array();
        
        let confirmaDelete = false;
        let countDelete = 0;
        
        //checar quais checkbox estão marcadas
        for ( let l = 0; l < marcados.length; l++) {
            if(marcados[l].checked) {
                confirmaDelete = true;
                countDelete++;
                for(let i in tarefas) {
                    if (tarefas[i].id == marcados[l].id) {
                        tarefas[i].checked = true;
                        auxiliaMarcados.push(marcados[l]);
                    }
                }
            }
        }

        //remover as tarefas 
        tarefas = tarefas.filter(obj => obj.checked == false);

        //remover os elementos html da página
        for(let i in auxiliaMarcados) {
            let inputParent = auxiliaMarcados[i].parentNode;
            listaTarefa.removeChild(inputParent);
        }
        
        if(!(confirmaDelete)) {
            alerta.classList.add('alert', 'alert-danger')
            alerta.innerHTML = 'Nenhuma tarefa selecionada'
        } else {
            alerta.innerHTML = ''
            alerta.classList.remove('alert', 'alert-danger')

            alerta.classList.add('alert', 'alert-success')
            if(countDelete > 1) {
                alerta.innerHTML = 'Tarefas removidas com sucesso!'
            } else {
                alerta.innerHTML = 'Tarefa removida com sucesso!'
            }
            
        }
    }
    marcarTarefa()
}

//MARCANDO TAREFAS
