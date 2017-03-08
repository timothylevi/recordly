export function registerHandlers(handlers) {
  for (var i = 0; i < handlers.length; i++) {
    this[handlers[i]] = this[handlers[i]].bind(this);
  }
}
