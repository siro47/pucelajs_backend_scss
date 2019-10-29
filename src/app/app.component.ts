import { Component } from '@angular/core';
import {Socket} from "ngx-socket-io";

import {bufferTime, map, throttle} from "rxjs/operators";
import {interval} from "rxjs/internal/observable/interval";
import {ChartDataSets, ChartOptions} from "chart.js";
import {Color, Label} from "ng2-charts";
import {merge} from "rxjs/internal/observable/merge";

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
        const premObservable = this.socket.fromEvent('premMessage')
        const stdObservable = this.socket.fromEvent('stdMessage')

        const commObservable = merge(premObservable, stdObservable)

        premObservable
            .pipe(
                map (ev => { return {type: 'text', text: ev, avatar: 'https://data.whicdn.com/images/54647343/original.jpg'}} )
            )
            .subscribe(msg => {
                if (this.messages.length >=6) this.messages.shift();
                this.messages.push(msg)
            })

        const stdObserver1 = stdObservable
            .pipe(
                map (ev => { return {type: 'text', text: ev}} ),
                throttle(ev => interval(500)),
            )
            .subscribe(msg => {
                if (this.messages.length >=6) this.messages.shift();
                this.messages.push(msg)
            })

        const stdObservcommObservableer2 = commObservable
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
