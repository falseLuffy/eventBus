# eventbus

## 安装  
```shell script
 npm install eventbus -S
```
## 使用
```javascript
 import EventBus from 'eventbus'

 const Bus = new EventBus()

 Bus.on('name', cb)

 Bus.emit('name', value)

 Bus.once('name', cb)

 Bus.off('name', cb)
```
