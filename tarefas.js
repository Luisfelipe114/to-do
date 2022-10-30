function Tarefa(id, value) {
    this.value = value;
    this.id = id;
    let checkedValue = false;

    Object.defineProperty(this, 'checked', {
            configurable: false,
            get: function() {
                return checkedValue;
            },
            set: function(check) {
                checkedValue = check;
            }
        }
    )
}

function Lista(idElementos) {
    this.tarefas = Array();
    this.alerta = document.getElementById('alert')
    this.listaTarefa = document.createElement("ul");
    this.id = 0;
}

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
        lista.alerta.classList.add('alert', 'alert-danger')
        lista.alerta.innerHTML = 'Insira algo válido' 
    } else {
        lista.alerta.innerHTML = ''
        lista.alerta.classList.remove('alert', 'alert-danger')

        let tarefa = new Tarefa(lista.id, a);

        lista.tarefas.unshift(tarefa);
        a = document.getElementById('tarefa').value = ''
        lista.id++;
        gerarElemento();
    }
}

function gerarElemento() {
    let itemTarefa = document.createElement("li");
    let inputTarefa = document.createElement("input");
    let txtTarefa = document.createTextNode(lista.tarefas[0].value);
    [inputTarefa.type, inputTarefa.name, inputTarefa.className, itemTarefa.className] = ["checkbox", "item", "itens", "lista"];

    [inputTarefa.id, inputTarefa.value] = [lista.tarefas[0].id, lista.tarefas[0].id];

    inputTarefa.addEventListener("click", marcarTarefa)
    itemTarefa.append(txtTarefa, inputTarefa);
    lista.listaTarefa.appendChild(itemTarefa);
    document.getElementById('novas_tarefas').appendChild(lista.listaTarefa);
    marcarTarefa();
}

function removerTarefa() {
    if(lista.tarefas == '') {
        lista.alerta.classList.add('alert', 'alert-danger')
        lista.alerta.innerHTML = 'Nenhuma tarefa adicionada'
    } else {
        //obter os input checkbox
        let marcados = document.getElementsByName('item');
        let auxiliaMarcados = Array();
        
        let confirmaDelete = false;
        let countDelete = 0;
        
        //checar quais checkbox estão marcadas
        for ( let j in marcados) {
            if(marcados[j].checked) {
                confirmaDelete = true;
                countDelete++;
                for(let i in lista.tarefas) {
                    if (lista.tarefas[i].id == marcados[j].id) {
                        lista.tarefas[i].checked = true;
                        auxiliaMarcados.push(marcados[j]);
                    }
                }
            }
        }

        //remover as tarefas 
        lista.tarefas = lista.tarefas.filter(obj => obj.checked == false);

        //remover os elementos html da página
        for(let i in auxiliaMarcados) {
            let inputParent = auxiliaMarcados[i].parentNode;
            lista.listaTarefa.removeChild(inputParent);
        }
        
        if(!(confirmaDelete)) {
            lista.alerta.classList.add('alert', 'alert-danger')
            lista.alerta.innerHTML = 'Nenhuma tarefa selecionada'
        } else {
            lista.alerta.innerHTML = ''
            lista.alerta.classList.remove('alert', 'alert-danger')
            lista.alerta.classList.add('alert', 'alert-success')
            if(countDelete > 1) {
                lista.alerta.innerHTML = 'Tarefas removidas com sucesso!'
            } else {
                lista.alerta.innerHTML = 'Tarefa removida com sucesso!'
            }
        }
    }
    marcarTarefa()
}

const lista = new Lista();
