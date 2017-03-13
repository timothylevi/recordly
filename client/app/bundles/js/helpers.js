export const bindHandlers = function bindHandlers(handlers) {
  for (let i = 0; i < handlers.length; i += 1) {
    this[handlers[i]] = this[handlers[i]].bind(this);
  }
};

export const blankFunction = function blankFunction() {};
