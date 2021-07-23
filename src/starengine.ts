import { ViewPort } from "./viewport";

export class StarEngine {
  
  private viewport?: ViewPort;

  constructor(private elementID: string) {
    
  }


  run(): void {
    if (!this.viewport){
      this.viewport = new ViewPort(this.elementID);
    }
    console.log(this.viewport)
    console.log('Start');
  }
}
