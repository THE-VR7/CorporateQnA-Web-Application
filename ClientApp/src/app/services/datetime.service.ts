import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }

  public dateDiff(date2:Date, date1:Date) 
 {
	var diff =(date2.getTime() - date1.getTime()) / 1000;
	diff /= 60;
	let result =  Math.abs(Math.round(diff));
	if(result<1)
		return 'a few mins ago';
	else if(result<60)
		return result+' mins ago';
	else if(result<1440)
		return Math.abs(Math.round(result/60))+' hrs ago';
	else if(result<1440+720)
		return Math.round((Math.abs(Math.round(result/60)))/24)+' day ago';
	else 
		return Math.round((Math.abs(Math.round(result/60)))/24)+' days ago';
 }
 
}
