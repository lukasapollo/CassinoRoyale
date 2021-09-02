// Quarto
const StartApp = {
    start(time, alvo, current){
        var count = 0;

        const stop = setInterval(()=> {
            
            startOrder.resetDices()

            count++
            
            if(count <= time){

                setTimeout(() => {
                    startOrder.diceGeratorStart(count, time, alvo, current)
                    startOrder.counterEffect(count, time)
                }, 300)
               
            } else if(count > time){
                clearInterval(stop)
                console.log('Stop!')
                count = 0
            }
            
        }, 1000)
    }
}

// Primeiro
document.querySelector('#button-start').addEventListener('click', () => {
    let valuePreco = document.querySelector('#preco').value
    let valueTime = document.querySelector('select-time').getAttribute('name-select')
    let valueAlvo = document.querySelector('select-alvo').getAttribute('name-select')
    
    // Verifica se o usuario preencheu todos os campos, caso faltar 1 a aplicação não executa
    let resultValidate = validateForm.verif(valuePreco, valueAlvo, valueTime)
    //Se o resultado da validação for TRUE, os valores vão para um array, se não, os valores armazenados são TRUE e false
    const recevResult = resultValidate == true ? [valuePreco, valueAlvo, valueTime] : resultValidate;
    
    let time = startOrder.verifTime(recevResult)
    
    if(time === false){
        alert('Preencha todos os campos para executar a sua ordem!')
    } else if(time[0] === false && time[1] === true){
        alert('Atenção: digite apenas números no campo de PREÇO!')
    } else {
        StartApp.start(time, Number(recevResult[1]), Number(valuePreco))
    }
})

// Segundo - Validaçao dos dados
const validateForm = {
    verif(preco, alvo, time){
      let currentPrice = Number(preco)
      if(isNaN(currentPrice)){
          return [false, true]
      } else if(preco === '' || alvo === 'ALVO' || time === 'TIME' ){
           return false
       } else {
           return true
       }
    }
}


const startOrder = {

    diceGeratorStart(result, time, alvo, current){
    
        let dice = document.querySelectorAll(".radomEfects")
        let i = Math.floor(Math.random() * 6)
        dice[i].classList.add('gold')
        console.log(dice[i])

        if(result == time){
            setTimeout(() => {
                startOrder.resultDices(i + 1, alvo, time, current)
            }, 1300)  
        }
       
    },

    resetDices(){
        
        let dice = document.querySelectorAll(".radomEfects")
        dice.forEach((dice, i) => {
            if(dice.className.indexOf('gold') > -1){
                dice.classList.remove('gold')
            }
    })},
    // Terceiro
    verifTime(value){
        if(value[2] === "4s"){
            
            return 4
          }else if(value[2] === "8s"){
             
            return 8
          } else if(value[2] === "10s"){
            
            return 10
          } else {
              return value
          }
    },

    resultDices(result, alvo, time, current){
        let resultFinal = result === alvo ? 'Gain' : 'Loss'
        let containerResult = document.querySelector('#container-relogio')
        
       containerResult.innerHTML = `
       <div id="time-start">
           <img class="radomEfects ${resultFinal}" src="/SVG/dado-${result}-withe.svg" alt="">
       </div>
       <div id="contador">
           <div class="itm itm1"></div>
           <div class="itm itm2"></div>
           <div class="itm itm3"></div>
           <div class="itm itm4"></div>
           <div class="itm itm5"></div>
           <div class="itm itm6"></div>
           <div class="itm itm7"></div>
           <div class="itm itm8"></div>
           <div class="itm itm9"></div>
           <div class="itm itm10"></div>
       </div>
       `
       if(resultFinal == "Gain"){
          let gainLoss = document.querySelectorAll('.container-results')
          let valueTheGain = document.querySelector('.valueResult')
          let valueTime = document.querySelector('.valueTime')
          let diceValue = document.querySelector('.dadoValue')
          diceValue.textContent = result  
          valueTime.textContent = `${time}s`
          valueTheGain.textContent = result
          gainLoss.forEach((x) => {
            x.style.cssText = `
            color: green;
           
          `
          }) 
       } else if(resultFinal == "Loss"){
          let gainLoss = document.querySelectorAll('.container-results')
          let valueTheGain = document.querySelector('.valueResult')
          let valueTime = document.querySelector('.valueTime')
          let diceValue = document.querySelector('.dadoValue')
          diceValue.textContent = result
          valueTime.textContent = `${time}s`
          valueTheGain.textContent = result
          gainLoss.forEach((x) => {
            x.style.cssText = `
            color: red;
           
          `
          })
          
       }

       wallet.calc(resultFinal, current)

    },

    counterEffect(count, time){
        
        let score = time - count
        if(count == 1) {
            let timeContainer = document.querySelector('#container-relogio')
                  
            timeContainer.innerHTML = `
                <div id="time-start">
                    
                </div>
                <div id="contador">
                    <div class="itm"></div>
                    <div class="itm"></div>
                    <div class="itm"></div>
                    <div class="itm"></div>
                    <div class="itm"></div>
                    <div class="itm"></div>
                    <div class="itm"></div>
                    <div class="itm"></div>
                    <div class="itm"></div>
                    <div class="itm"></div>
                </div>
            `
            if(count == time){
                count = 0
            }
       }

       let i = document.querySelectorAll('.itm')
       i[count - 1].classList.add(`itm${count}`)
       document.querySelector('#time-start').innerHTML = `
            ${score + 1}s
       `     
       
    }
}

const wallet = {
    saldoAtual: 10000,
    exirSaldo(){
        document.querySelector('span.item-wallet.i-2').innerHTML = wallet.saldoAtual.toLocaleString('pt-br', {minimumFractionDigits: 2});
    },

    calc(resultOrder, betCurrent){
        if(resultOrder === 'Gain'){
            wallet.saldoAtual = wallet.saldoAtual + betCurrent
            wallet.exirSaldo()
        } else {
            wallet.saldoAtual = wallet.saldoAtual - betCurrent
            wallet.exirSaldo()
        }
    }
}

wallet.exirSaldo()


