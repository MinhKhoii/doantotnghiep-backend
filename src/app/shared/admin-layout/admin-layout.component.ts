import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css',
  "../../..//assets/admin-ui/css/responsive.css",
  "../../../assets/admin-ui/css/style.css",
  "../../../assets/admin-ui/css/hoadonban.css"
]
})


export class AdminLayoutComponent {
  constructor(private renderer:Renderer2){}
  ngOnInit(): void {
    this.loadScript('')

  }
  private loadScript(url: string) {
    const script = this.renderer.createElement('script');
    script.src= url;
    this.renderer.appendChild(document.body, script); 
  }
}
