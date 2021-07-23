export class ViewPort {

  private element: any;
  private ctx: any;

  constructor(private elementID: string) {
    if (this.elementID) {
      if (typeof this.elementID === 'string') {
        this.element = window.document.querySelector(this.elementID);
      } else {
        this.element = this.elementID;
      }
    } else {
      this.element = window.document.body;
    }

    if (!this.element.getContext) {
      throw new Error("Element don't have the getContext");
    }
    this.ctx = this.element.getContext('2d');

    
    window.addEventListener('resize', () => this.updateSize());
    this.updateSize();
    
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, 200, 200);
  }

  updateSize() {
    var ele = this.element;
    var parent = ele.parentElement;
    this.setSize(parent.offsetWidth, parent.offsetHeight);
  }

  setSize(width: any, height: any) {
    this.element.width = width;
    this.element.height = height;
  }
}
