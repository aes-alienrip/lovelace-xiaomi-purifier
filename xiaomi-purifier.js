class XiaomiPurifier extends HTMLElement {
  _t(str){
    const chinese = {
      'Good': '優',
      'Moderate': '良',
      'Mild Unhealthy': '輕度污染',
      'Unhealthy': '中度污染',
      'Very Unhealthy': '重度污染',
      'Hazardous': '嚴重污染',

      'Air Purifier': '空氣淨化器',

      'On': '開機',
      'Off': '關機',

      'Set Preset Mode': '設置模式',
      'Device Turned On': '裝置已開啟',
      'Device Turned Off': '裝置已關閉',
      'Indoor AQ': '室內空氣',
      
      'Auto': '自動',
      'Silent': '睡眠',
      'Favorite':'最愛',
      'Filter Remaining': '濾芯剩餘',
      'Temperature': '溫度',
      'Humidity': '濕度'
    }
    if( !this.config ) return str;
    const translate = this.config.translate||(()=>{
      return this.config.language==='cht' ? chinese : null;
    })()||{};
    if( typeof translate[str] === 'string' ){
        return translate[str];
    }
    return str;
}

  constructor() {
    super()
    this.fan_mode = {
      'Auto': '自動模式',
      'Silent': '睡眠模式',
      'Favorite': '最愛模式'
    }
    const shadow = this.attachShadow({ mode: 'open' });
    const div = document.createElement('ha-card');
    div.className = 'ha-air-filter-panel off'
    div.innerHTML = `
            
            <div class="card-header">
                <a class="name">
                    <ha-icon icon="mdi:air-filter"></ha-icon> 
                    <span class="title">空氣淨化器</span>
                </a>
                <span class="ledon"><ha-icon-button><ha-icon style="margin-top:-8px;" id="ledon" icon="mdi:led-on"></ha-icon></ha-icon-button></span>
                <span><ha-icon-button><ha-icon style="margin-top:-8px;" id="lock" icon="mdi:lock"></ha-icon></ha-icon-button></span>
                <span><ha-icon-button><ha-icon style="margin-top:-8px;" id="buzzer" icon="mdi:volume-high"></ha-icon></ha-icon-button></span>
                <span><ha-icon-button><ha-icon style="margin-top:-8px;" id="more" icon="mdi:dots-vertical"></ha-icon></ha-icon-button></span>
            </div>
            <div class="duang">
            <div class="body">
                <div class="content">
                  <p>PM2.5(μg/m³)</p>
                  <p><span class="var-pm2_5">38</span></p>
                  <p><span data-title="Indoor AQ">室內空氣</span> <span class="var-quality">優</span></p>
                  <p><span class="temperature"><ha-icon icon="mdi:thermometer"></ha-icon><b>26</b>℃</span><span class="humidity"><ha-icon icon="mdi:water-percent"></ha-icon><b>35</b>%</span></p>
                </div>
                <div class="content-bg">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
            </div>
            </div>
            <div class="tmp-body hide">
                <div>
                  <span>90</span>
                  <p><span data-title="Filter Remaining">濾芯剩餘</span> (%)</p>
                </div>
                <div>
                  <span>40</span>
                  <p><span data-title="Temperature">溫度</span> (℃)</p>
                </div>
                <div>
                  <span>50</span>
                  <p><span data-title="Humidity">濕度</span> (%)</p>
                </div>
            </div>
            <div class="footer">
              <div class="status">
                <span><ha-icon icon="mdi:power" ></ha-icon></span>
                <p>開機</p>
              </div>
              <div>
              <span><ha-icon icon="mdi:brightness-auto" ></ha-icon></span>
                <p data-title="Auto">自動</p>
              </div>
              <div>
              <span><ha-icon icon="mdi:power-sleep" ></ha-icon></span>
                <p data-title="Silent">睡眠</p>
              </div>
              <div>
              <span><ha-icon icon="mdi:heart" ></ha-icon></span>
                <p data-title="Favorite">最愛</p>
              </div>  
              <div class="favorite-level hide">
                <div><output>3</output><span class="icon-button"><ha-icon icon="mdi:chevron-down"></ha-icon></span><input type="range" min="0" max="16" /></div>
              </div>    
            </div>
            <div>
              
            </div>
        `
    shadow.appendChild(div)

    const style = document.createElement('style')
    style.textContent = `
            
            .ha-air-filter-panel{overflow:hidden;}            
            .card-header{display:flex;justify-content: space-between;}
            .card-header .name{text-decoration: none;flex-grow: 1;}
            .card-header .title{font-size:1em}
                        
           .content-bg{
              height: 300px;
              width: 300px;
              border-radius: 50%;}
           .content-bg div{position:absolute;height: 310px;width: 290px;border-radius: 50%;}
           .content-bg div:nth-child(1){
              transform: rotate(0deg);
              animation: a1 5s linear 2s infinite alternate;
           }
           .content-bg div:nth-child(2){
            transform: rotate(60deg);
            animation: a2 4s linear 1s infinite alternate;
           }
           .content-bg div:nth-child(3){
            transform: rotate(120deg);
            animation: a3 3s linear 1s infinite alternate;
           }

           @keyframes a1{
              from {transform: rotate(0deg);}
              to {transform: rotate(360deg);}
           }
           @keyframes a2{
              from {transform: rotate(60deg);}
              to {transform: rotate(300deg);}              
            }
            @keyframes a3{
              from {transform: rotate(120deg);}
              to {transform: rotate(240deg);}
            }
           
            .content{width:290px;height:290px;position:absolute;border-radius: 50%;margin-top:10px;z-index:1;text-align: center;}
            .content p{padding:0;margin:0;}
            .content p:nth-child(1){padding-top: 50px;font-size:12px;color:white;}
            .content p:nth-child(1).advanced{padding-top: 70px !important;}
            .content p:nth-child(2){font-size:80px;color:white; /*margin: 40px 0;*/ line-height: 90px;}
            .content p:nth-child(2) span{cursor:pointer;}
            .content p:nth-child(3){color:white;}
            .content p:nth-child(4) {padding-top: 30px;}
            .content p:nth-child(4) span{color: white; }
            .content p:nth-child(4) span b{font-weight: normal;font-size: 2em; padding:0 3px;cursor:pointer;}
            .content p:nth-child(4) span ha-icon{margin-top: -10px; color: rgba(255,255,255,0.7);}
            .content p:nth-child(4) span:first-of-type{margin-right:10px;}
            .content p:nth-child(4) span:last-of-type{margin-left:10px;}

            .body{width: 300px;margin: 0 auto;}
            .tmp-body{display:flex;padding:30px 0;}
            .tmp-body div{flex:1;text-align:center;}
            .tmp-body div span:not([data-title]){font-size:40px;}
            .tmp-body div p{margin:0;font-size:12px;color:gray;}
            .tmp-body div:nth-child(1){border-right:1px solid silver;}
            .tmp-body div:nth-child(2){border-right:1px solid silver;}
            .tmp-body div:nth-child(2) span{cursor:pointer;}
            .tmp-body div:nth-child(3) span{cursor:pointer;}
            .footer{display:flex;}
            .footer div{flex:1;text-align:center;}
            .footer div ha-icon{font-size:25px;cursor:pointer;}
            .footer div span{display:inline-block;border:1px solid silver;padding:10px;border-radius:50%;text-align:center;}            
            .footer div p{color: var(--secondary-text-color); /*gray;*/}
            .footer div.favorite-level{height:94px;}
            .footer div.favorite-level div{padding:10px; }
            .footer div.favorite-level input[type="range"] {width: 100%;  margin-top:20px;}
            .footer div.favorite-level .icon-button {float: right; width: 26px; height: 26px; display: block; cursor: pointer;border:none;padding:initial;}

            .hide{display: none;}

            /**on**/
            .on .content-bg div{background: rgba(1,182,165,.1);}
            .on .content{background:#01b6a5; overflow:hidden;}
            .on.ledoff .content{background: rgba(0,0,0,0.9) !important;}
            .on .footer .status span{background:#f44336;color:white;}
            .on .footer .status p{var(--primary-text-color); /*#222;*/}
            .on .footer div.active span{background:#01b6a5;color:white;}
            .on .footer div.active p{color: var(--primary-text-color); /*#222;*/}
            .on .tmp-body div span:not([data-title]){color:#01b6a5;}
            
            /**aqi bg-color base on https://aqicn.org/calculator**/
            .on .level-1{background-color:#01BE9E;}
            .on .level-2{background-color:#FFC800;}
            .on .level-3{background-color:darkorange;}
            .on .level-4{background-color:#BE0027;}
            .on .level-5{background-color:purple;}
            .on .level-6{background-color:maroon;}

            /**off**/
            .off .content-bg div{background: rgba(0,0,0,.1);}
            .off .content{background:#607d8b;overflow:hidden;}
            .off .footer div{color:gray!important;}
            .off .footer .status span{background:#01b6a5;color:white;}
            .off .footer .status p{color:#222;}
        `
    shadow.appendChild(style);

    let holdStarter = null;
    let holdDelay = 500;

    this.shadow = shadow
    const $ = this.shadow.querySelector.bind(this.shadow)
    const $$ = this.shadow.querySelectorAll.bind(this.shadow);
    this.$ = $
    this.$$ = $$;
    // power
    $('.footer div:nth-child(1) span').onclick = () => {
      let ls = $('.ha-air-filter-panel').classList
      if (ls.contains('off')) {
        ls.remove('off')
        ls.add('on')
        this.toast(this._t('Device Turned On'));
        if (this.config.dust_effect===true) {
        this.duang()
        }
      } else {
        ls.remove('on')
        ls.add('off')
        this.toast(this._t('Device Turned Off'));
      }
      this.call('toggle')
    }
    // auto
    $('.footer div:nth-child(2) span').onclick = this.set_preset_mode.bind(this, 'Auto')
    // silent
    $('.footer div:nth-child(3) span').onclick = this.set_preset_mode.bind(this, 'Silent')
    // favorite
    // $('.footer div:nth-child(4) span').onclick = this.set_preset_mode.bind(this, 'Favorite')
    $('.footer div:nth-child(4)').addEventListener(('ontouchstart' in document.documentElement ? 'touchstart' : 'mousedown'), (e)=>{
        holdStarter = setTimeout(()=>{
          holdStarter = null;
          // holding...
          
          if(!$('.footer div:nth-child(4)').classList.contains('active')) return;
          [].forEach.call($$('.footer>div:not(.favorite-level)'), el=>{
            el.classList.toggle('hide');
          });
          $('.footer div.favorite-level').classList.toggle('hide');
        }, holdDelay);
    });
    $('.footer div:nth-child(4)').addEventListener(('ontouchend' in document.documentElement ? 'touchend' : 'mouseup'),  ()=>{
        if( holdStarter ) {
          clearTimeout(holdStarter);
          holdStarter = null;
          // clicked;
          this.set_preset_mode('Favorite');
        }
    });
    $('.footer div.favorite-level .icon-button').onclick = ()=>{
        [].forEach.call($$('.footer>div:not(.favorite-level)'), el=>{
          el.classList.toggle('hide');
        });
        $('.footer div.favorite-level').classList.toggle('hide');
    }
    $('.footer div.favorite-level input[type="range"]').oninput = (e)=>{
        $('.footer div.favorite-level output').value = e.target.value;
        
    }
    $('.footer div.favorite-level input[type="range"]').onchange = (e)=>{
        $('.footer div.favorite-level output').value = e.target.value;
        // set favorite level
        this.callNumber('set_value', {
          value: e.target.value,
        })
    }
    // more
    $('.card-header ha-icon#more').onclick = () => {
      const entityId = this.config.entity;
      this.fire('hass-more-info', { entityId })
    }
    // more pm2_5
    $('.content p:nth-child(2) span').onclick = () => {
      const entityId = this.config.entity.replace('fan', 'sensor') + '_pm2_5';
      this.fire('hass-more-info', { entityId })
    }
    // switch led
    $('.body .content').ondblclick = (e) => {
      const isoff = $('.ha-air-filter-panel').classList.contains('ledoff');
      this.callSwitchLED(isoff ? 'turn_on' : 'turn_off',{} );
    }
  }

  // dust effect
  duang() {
    const { $ } = this
    if($('.duang .lizi')) return;
    let arr = []
    let f = document.createDocumentFragment()
    // left
    for (let i = 0; i < 20; i++) {
      let s = Math.round(Math.random() * 5) + 5
      let y = Math.round(Math.random() * 300)
      let kf = `dust-y${y}`
      let span = document.createElement('span')
      span.className='lizi'
      span.style.cssText = `animation: ${kf} ${s}s linear 1s infinite;left:-5px; margin-top:${y}px;`

      if (!arr.includes(kf)) {
        arr.push(`@keyframes ${kf}{from {left:0; margin-top:${y}px;}to {left:50%; margin-top:200px;}}`)
      }
      f.appendChild(span)
    }
    // right
    for (let i = 0; i < 20; i++) {
      let s = Math.round(Math.random() * 5) + 5
      let y = Math.round(Math.random() * 300)
      let kf = `dust-x${y}`
      let span = document.createElement('span')
      span.className='lizi'

      span.style.cssText = `animation: ${kf} ${s}s linear 1s infinite;right:-5px; margin-top:${y}px;`
      if (!arr.includes(kf)) {
        arr.push(`@keyframes ${kf}{from {right:0; margin-top:${y}px;}to {right:50%; margin-top:200px;}}`)
      }
      
      f.appendChild(span)
    }
    // style
    let style = document.createElement('style')
    style.textContent = `
      /**dust**/
      .duang{position: relative;overflow:hidden;padding-bottom:10px;}
      .duang .lizi{
        display:block;
        width:3px;height:3px;
        border-radius:50%;
        background-color: #01b6a5;
        position: absolute;
      }
      .off .duang .lizi{display: none;}
      ${arr.join('')}`
    f.appendChild(style)
    $('.duang').insertBefore(f, $('.body'))
  }

  // set_preset_mode
  set_preset_mode(preset_mode) {
    this.toast(`${this._t('Set Preset Mode')}【${preset_mode}】`)
    this.call('set_preset_mode', { preset_mode })
  }

  // notification
  toast(message) {
    this.fire("hass-notification", { message })
  }

  // event
  fire(type, data) {
    const event = new Event(type, {
      bubbles: true,
      cancelable: false,
      composed: true
    });
    event.detail = data;
    document.querySelector('home-assistant').dispatchEvent(event);
  }

  // service
  call(name, data = {}) { this.log('call service: ', name, data);
    const entity_id = this.config.entity;
    this._hass.callService('fan', name, {
      entity_id,
      ...data
    })
  }

  callNumber(name, data = {}) { this.log('call number service: ', name, data);
    const entity_id = this.config.entity.replace('fan', 'number') + '_favorite_level';
    this._hass.callService('number', name, {
        entity_id, 
        ...data
      })
  }

  callSwitchBuzzer(name) { this.log('call switch buzzer service: ', name);
    const entity_id = this.config.entity.replace('fan', 'switch') + '_buzzer';
    this._hass.callService('switch', name, { entity_id })
  }

  callSwitchLED(name) { this.log('call switch led service: ', name);
    const entity_id = this.config.entity.replace('fan', 'switch') + '_led';
    this._hass.callService('switch', name, { entity_id })
  }

  callSwitchLock(name) { this.log('call switch lock service: ', name);
    const entity_id = this.config.entity.replace('fan', 'switch') + '_child_lock';
    this._hass.callService('switch', name, { entity_id })
  }

  update({ title, preset_mode, pm2_5, filter_life_remaining, temperature, humidity, state, favorite_level, buzzer, ledon, child_lock }) {
    const { $,$$ } = this

    // power
    let ls = $('.ha-air-filter-panel').classList
    if (state === 'on' && ls.contains('off')) {
      ls.remove('off')
      ls.add('on')
      $('.footer div:nth-child(1) p').textContent = this._t('Off');
      if (this.config.dust_effect===true) {
      this.duang()
      }
    } else if (state === 'off' && ls.contains('on')) {
      ls.remove('on')
      ls.add('off')
      $('.footer div:nth-child(1) p').textContent = this._t('On');
    }
    $('.title').textContent = title

    if (ledon === 'on' && ls.contains('ledoff')) {
      ls.remove('ledoff')
    } else if (ledon === 'off' && !ls.contains('ledoff')) {
      if ( this.config.new_led_mode===true ){
        ls.remove('ledoff')
      }
      else if ( this.config.new_led_mode===false ){
        ls.add('ledoff')
      }
    }
    // advanced
    let temp = $('.content p:nth-child(4) .temperature b')
    let humid = $('.content p:nth-child(4) .humidity b')
    let advtemp = $('.tmp-body div:nth-child(2) span')
    let advhumid = $('.tmp-body div:nth-child(3) span')
    if( this.config.advanced===true ){
        $('.tmp-body div:nth-child(1) span').textContent = filter_life_remaining
        advtemp.textContent = temperature
        advtemp.onclick = () => {
          const entityId = this.config.entity.replace('fan', 'sensor') + '_temperature';
          this.fire('hass-more-info', { entityId })
        }
        advhumid.textContent = humidity
        advhumid.onclick = () => {
          const entityId = this.config.entity.replace('fan', 'sensor') + '_humidity';
          this.fire('hass-more-info', { entityId })
        }
    }
    temp.textContent = temperature;
    temp.onclick = () => {
      const entityId = this.config.entity.replace('fan', 'sensor') + '_temperature';
      this.fire('hass-more-info', { entityId })
    }
    humid.textContent = humidity;
    humid.onclick = () => {
      const entityId = this.config.entity.replace('fan', 'sensor') + '_humidity';
      this.fire('hass-more-info', { entityId })
    }
    // aqi lv base on https://aqicn.org/calculator
    let qls = $('.content').classList
    qls.remove('level-1', 'level-2', 'level-3', 'level-4', 'level-5', 'level-6')
    let quality = 'Good';
    if (pm2_5 < 12) {
      quality = 'Good'
      qls.add('level-1')
    }
    else if (pm2_5 < 36) {
      quality = 'Moderate'
      qls.add('level-2')
    }
    else if (pm2_5 < 56) {
      quality = 'Mild Unhealthy'
      qls.add('level-3')
    }
    else if (pm2_5 < 150) {
      quality = 'Unhealthy'
      qls.add('level-4')
    }
    else if (pm2_5 < 250) {
      quality = 'Very Unhealthy'
      qls.add('level-5')
    }
    else {
      quality = 'Hazardous'
      qls.add('level-6')
    }
    $('.var-quality').textContent = this._t(quality);
    $('.var-pm2_5').textContent = pm2_5;
    // preset_mode
    let mls2 = $('.footer div:nth-child(2)').classList
    let mls3 = $('.footer div:nth-child(3)').classList
    let mls4 = $('.footer div:nth-child(4)').classList
    mls2.remove('active')
    mls3.remove('active')
    mls4.remove('active')
    if (preset_mode == 'Auto') {
      mls2.add('active')
    } else if (preset_mode == 'Silent') {
      mls3.add('active')
    } else if (preset_mode == 'Favorite') {
      mls4.add('active')
    }
    // favorite_level
    if( favorite_level ){
        $('.footer div.favorite-level input[type="range"]').value = favorite_level;
        $('.footer div.favorite-level input[type="range"]').dispatchEvent(new Event('input',{
          bubbles: true,
          cancelable: true
        }));
    }
    // buzzer
    let iconbuzzer = $('.card-header ha-icon#buzzer')
    iconbuzzer.onclick = (e) => {
      const buzzer = e.target.getAttribute('icon') === 'mdi:volume-high';
      this.callSwitchBuzzer(buzzer ? 'turn_off' : 'turn_on',{} );
    }
    if (buzzer === 'on') {
      iconbuzzer.setAttribute('icon', 'mdi:volume-high')
    } else if (buzzer === 'off') {
      iconbuzzer.setAttribute('icon', 'mdi:volume-off')
    }
    // child_lock
    let iconlock = $('.card-header ha-icon#lock')
    iconlock.onclick = (e) => {
      const lock = e.target.getAttribute('icon') === 'mdi:lock';
      this.callSwitchLock(lock ? 'turn_off' : 'turn_on',{} );
    }
    if (child_lock === 'on') {
      iconlock.setAttribute('icon', 'mdi:lock')
    } else if (child_lock === 'off') {
      iconlock.setAttribute('icon', 'mdi:lock-open-variant')
    }
    // ledon
    let iconledon = $('.card-header ha-icon#ledon')
    iconledon.onclick = (e) => {
      const ledon = e.target.getAttribute('icon') === 'mdi:led-on';
      this.callSwitchLED(ledon ? 'turn_off' : 'turn_on',{} );
    }
    if (ledon === 'on') {
      iconledon.setAttribute('icon', 'mdi:led-on')
    } else if (ledon === 'off') {
      iconledon.setAttribute('icon', 'mdi:led-off')
    }
  }

  set hass(hass) {
    this._hass = hass
    const entityId = this.config.entity;
    const title = this.config.title;
    const state = hass.states[entityId];
    const attrs = state.attributes;
    const favorite_level = entityId.replace('fan', 'number') + '_favorite_level';
    const led = entityId.replace('fan', 'switch') + '_led';
    const buzzer = entityId.replace('fan', 'switch') + '_buzzer';
    const child_lock = entityId.replace('fan', 'switch') + '_child_lock';
    const pm2_5 = entityId.replace('fan', 'sensor') + '_pm2_5';
    const filter_life_remaining = entityId.replace('fan', 'sensor') + '_filter_life_remaining';
    const temperature = entityId.replace('fan', 'sensor') + '_temperature';
    const humidity = entityId.replace('fan', 'sensor') + '_humidity';
    const filter_use = entityId.replace('fan', 'sensor') + '_filter_use';
    if( this.config.advanced===true ){
      this.shadow.querySelector('.tmp-body').classList.remove('hide');
      this.shadow.querySelector('.content p:nth-child(1)').classList.add('advanced');
      this.shadow.querySelector('.content p:nth-child(4)').classList.add('hide');
    }
    if( this.config.new_led_mode===false ){
      this.shadow.querySelector('.ledon').classList.add('hide');
    }
    if (state) {
      this.update({
        title: title || attrs['friendly_name'] || this._t('Air Purifier'),
        preset_mode: attrs['preset_mode'] || '',
        pm2_5: hass.states[pm2_5].state || 0,
        filter_life_remaining: hass.states[filter_life_remaining].state || 0,
        temperature: hass.states[temperature].state || 0,
        humidity: hass.states[humidity].state || 0,
        state: state.state,
        filter_use: hass.states[filter_use].state || 0,
        // purify_volume: attrs['purify_volume'] || 0,
        led: hass.states[led].state ? this._t('On') : this._t('Off'),
        favorite_level: hass.states[favorite_level].state,
        buzzer: hass.states[buzzer].state || off,
        child_lock: hass.states[child_lock].state || off,
        ledon: hass.states[led].state || off,
      })
    }
  }
  // 加入日誌開關l
  log() {
    
//      console.log(...arguments)
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
    const elems = this.shadow.querySelectorAll('[data-title]');
    [].forEach.call(elems, (e)=> {
      e.innerText = this._t(e.getAttribute('data-title'));
    });
  }

  getCardSize() {
    return 2;
  }
}

customElements.define('xiaomi-purifier', XiaomiPurifier);
