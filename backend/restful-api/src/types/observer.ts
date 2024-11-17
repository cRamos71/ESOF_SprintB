export interface Observer {
  update(opportunity: any): void;
}

export interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(opportunity: any): void;
}