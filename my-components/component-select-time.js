export default class OptionSelectTime extends HTMLElement {
    count = 0;
    constructor(){

        
        super()
        this.build()
    }

    build(){
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(this.style())
         
        const domChild = this.createSelect()
        shadow.appendChild(domChild)
    }

    createSelect(){

        const domChild = document.createElement('div')
        domChild.classList.add('select-style')
        const text = this.getAttribute('name-select')
        const containerSelect = document.createElement('div')
        containerSelect.setAttribute('id', 'select-container')
        containerSelect.innerHTML = `
        <div id="text">${text}</div>
        <div class="seta">&#708</div>
        `
        domChild.appendChild(containerSelect)

        containerSelect.addEventListener('click', this.openSelect.bind(this, domChild))

        return domChild
    }

    openSelect(c) {
        
        this.count++
         if(this.count <= 1){
            const opt = document.createElement('div')
            opt.setAttribute('id', 'container-options')
            c.appendChild(opt)
            opt.innerHTML = `
                <div class="options">4s</div>
                <div class="options">8s</div>
                <div class="options">10s</div>   
            `
            let v = this.shadowRoot.querySelector('.seta')
            v.innerHTML = '&#709'
         }else {
            let containerOpt = this.shadowRoot.querySelector('#container-options')
            let seta = this.shadowRoot.querySelector('.seta')
            seta.innerHTML = '&#708'
            containerOpt.remove()
            this.count = 0
         }

         const itemOpt = this.shadowRoot.querySelectorAll('.options')
         itemOpt.forEach((a) => {
            a.addEventListener('click', (event) => {
                const addValueOpt = this.shadowRoot.querySelector('#text')
                addValueOpt.innerHTML = event.target.textContent
                this.setAttribute('name-select', event.target.textContent)
                let containerOpt = this.shadowRoot.querySelector('#container-options')
                let seta = this.shadowRoot.querySelector('.seta')
                seta.innerHTML = '&#708'
                containerOpt.remove()
                this.count = 0
            })
         })
    }

    style(){
        const style = document.createElement('style')

        const setStyles = {
            backGroundPrimary: '#181C20',
            hoverOptions: 'rgb(240, 164, 16)',
            setFontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
            Width: this.getAttribute('width')
        }

        style.textContent = `
        .select-style {
            font-family: ${setStyles.setFontFamily}; 
            width: ${setStyles.Width};
            display: block;
            color: #b3b3b3;
            font-weight: 400;
            margin-bottom: 10px;
        }
        
        #select-container{
            background-color: ${setStyles.backGroundPrimary};
            display: flex;
            justify-content: space-between;
            padding: 0px 12px;
            height: 52px;
            line-height: 3.3rem;
            border-radius: 4px;
            margin-bottom: 5px;
            
            cursor: pointer;
        }
        
        #container-options{
            background-color: ${setStyles.backGroundPrimary};
            position: relative;
            width: 610px;
            padding: 7px 0px;
            border-radius: 3px;
            cursor: pointer;
            z-index:10;
            overflow-y: scroll;
            height: 98px;
            text-align: left;
            left: -50px;
        }

        #container-options::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        } 

        #container-options::-webkit-scrollbar-track-piece{
            background-color: #16181b;
            border-radius: 5px;
        }

        #container-options::-webkit-scrollbar-thumb {   
            background-color: #ffc107;
            border-radius: 5px;
        }
        
        .options{ 
            font-weight: 600;
            padding: 7px 12px;
            margin-top: 2px;
        }
        
        .options:hover{
            background-color: ${setStyles.hoverOptions};
            color: black;
        }
        `
        return style
    }
}

