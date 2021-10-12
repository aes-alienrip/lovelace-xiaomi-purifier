# lovelace-xiaomi-purifier
Xiaomi Air Purifier lovelace card with css animation

![screenshot](https://user-images.githubusercontent.com/73251414/136708653-04b76202-5a67-446b-93d8-e544c0b6feb5.png)

## Extra Features
1. compact view to show temperature and humidity 
2. button to turn on/off buzzer,child lock and led
3. double click to swith led 
4. hold "Favorite" button to adjust favorite level
5. single click on temperature, humidity and pm2.5 value to show history

## HACS Installation
1. HACS -> Settings -> Add custom repository <-> Plugin
2. Find 'Xiaomi Air Purifier Card' in HACS Plugins
3. Install and add to Lovelace

## Manual Installation
1. Download `xiaomi-purifier.js` to `www/plugins/xiaomi-purifier.js`
1. Add to lovelace resources
   ``` yaml
   resources:
    - url: /local/plugins/xiaomi-purifier.js
      type: js
   ```
## Add lovelace card 
  ``` yaml
  type: 'custom:xiaomi-purifier'
  entity: fan.anyid
  title: name of the purifier device #optional
  dust_effect: true #optional
  new_led_mode: false #optional
  ```
  
## Flags
| Flag                     | Values                             | Usage                                                                       |
|--------------------------|------------------------------------|-----------------------------------------------------------------------------|
| advanced                 | true                               | Showing temperature, humidity and filter remaining in the middle.           |
|                          | **false**                          | Showing temperature and humidity in green panel.                            |
| dust_effect              | true / **false**                   | Showing mi-home app likes dust effect, false to save cpu rendering usage.   |
| new_led_mode             | **true**                           | Showing aqi color in panel ignoring led state, adding led icon to toggle.   |
|                          | false                              | Showing black panel only if led is off, double click panel to switch led.   |

## Language
Displays English texts by default, for Traditional Chinese users, add 
```
language: cht
``` 
to "Card Configuration" for displaying texts in Traditional Chinese.

## Translation
Add translations to "Card Configuration" to get your own language support. Translate to Simplified Chinese as example below:
``` 
translate:
  Good: 优
  Moderate: 良
  Mild Unhealthy: 轻度污染
  Unhealthy: 中度污染
  Very Unhealthy: 重度污染
  Hazardous: 严重污染
  Air Purifier: 空气净化器
  On: 开机
  Off: 关机
  Set Preset Mode: 设置模式
  Device Turned On: 装置已开启
  Device Turned Off: 装置已关闭
  Indoor AQ: 室内空气
  Auto: 自动
  Silent: 睡眠
  Favorite: 最爱
  Filter Remaining: 滤芯剩余
  Temperature: 温度
  Humidity: 湿度

```


## Credits
[iwzoo](https://github.com/iwzoo/lovelace-xiaomi-purifier), 
[shaonianzhentan](https://github.com/shaonianzhentan/lovelace-air-filter) (Original Author)
