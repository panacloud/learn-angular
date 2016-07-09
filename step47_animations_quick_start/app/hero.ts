export class Hero {
  id: number;
  name: string;
  state: string;
  
  constructor(id, name, state){
      this.id = id;
      this.name = name;
      this.state = state;
  }

  toogleState(){
      if(this.state === "active"){
          this.state = 'inactive';
      }
      else {
          this.state = "active";
      }

  }
}
