export const registerHandlers = function registerHandlers(handlers) {
  for (let i = 0; i < handlers.length; i += 1) {
    this[handlers[i]] = this[handlers[i]].bind(this);
  }
};

export const blankFunction = function blankFunction() {};
