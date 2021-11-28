# Complete Node.js Course

## Gettin Started

### 4 - How Node Works

*Node's architecture* makes it ideal for building applications that include *alot of disk or network access*. We can *serve more clients without the need to throw in more hardware*. And that's why *node applications are highly scalable*. In contrast, *Node should not be used for CPU-intensive applications like video encoding or an image manipulation service*. In this kind of applications, we have alot of calculations that should be done by the *CPU*, and few operations that *touch the file system or network*. Since *Node applications are single threaded*, when performing *the calculations to serve one client, other clients have to wait*, and that's why *Node should not be used for CPU-intensive applications*. It should only be used for *building data intensive and real-time applications*.

```javascript
function sayHello(name) {
    console.log('Hello ' + name)
}
sayHello('Mukhtar') // Hello Mukhtar
```
