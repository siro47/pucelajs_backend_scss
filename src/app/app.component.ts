import { Component } from '@angular/core';
import {Socket} from "ngx-socket-io";

import {bufferTime, map, throttle} from "rxjs/operators";
import {interval} from "rxjs/internal/observable/interval";
import {ChartDataSets, ChartOptions} from "chart.js";
import {Color, Label} from "ng2-charts";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    lastMessage = 'Ready to receive...';
    messageCounter = 0;

    messages= [];

    public data:number[] = []
    public lineChartData: ChartDataSets[] = [
        { data: [], label: 'Messages' },
    ];
    public lineChartLabels: Label[] = [];
    public lineChartOptions: ChartOptions = {
        responsive: true
    };
    public lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(132,110,173,1)',
        },
    ];
    public lineChartLegend = true;
    public lineChartType = 'bar';
    public lineChartPlugins = [];

    constructor(private socket: Socket) {
        for (let i=0; i<100; i++) {
            this.lineChartLabels.push(i.toString())
        }
    }

    ngOnInit() {
        this.socket.fromEvent('premMessage')
            .subscribe((msg:string) => this.lastMessage = msg)

        const stdObservable = this.socket.fromEvent('stdMessage')

        const stdObserver1 = stdObservable
            .pipe(
                map (ev => { return {type: 'text', text: ev}} ),
                throttle(ev => interval(500)),
            )
            .subscribe(msg => {
                if (this.messages.length >=6) this.messages.shift();
                this.messages.push(msg)
            })

        const stdObserver2 = stdObservable
            .pipe(
                bufferTime(1000)
            )
            .subscribe(accMsg => {
                if (this.data.length >= 100) this.data.shift();
                this.data.push(accMsg.length)
                this.lineChartData[0].data = [...this.data]
            })
    }
}
