/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
 */
import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from 'src/app/helpers/utils';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
  transform(list: any[] | undefined, criteria = ''): any[] {
    console.log('list to groupBy', criteria, list);
    if (list == undefined) {
      console.log('no list. returning empty array');
      return [];
    }
    console.log('grouped list', Utils.groupBy(list, criteria));
    return Utils.groupBy(list, criteria);
  }
}

@Pipe({
  name: 'groupByDate',
})
export class GroupByDatePipe implements PipeTransform {
  transform(items: any[], field: string): any[] {
    if (!items || items.length === 0) {
      return [];
    }
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Group items by date
    const groups = items.reduce((groupedItems, item) => {
      const date = new Date(item[field]);
      let key = date.toLocaleDateString();
      if (
        date.getFullYear() == today.getFullYear() &&
        date.getMonth() == today.getMonth() &&
        date.getDate() == today.getDate()
      ) {
        key = 'Hoy (' + date.toLocaleDateString() + ')';
      }
      if (
        date.getFullYear() == yesterday.getFullYear() &&
        date.getMonth() == yesterday.getMonth() &&
        date.getDate() == yesterday.getDate()
      ) {
        key = 'Ayer (' + date.toLocaleDateString() + ')';
      }
      if (!groupedItems[key]) {
        groupedItems[key] = [];
      }
      groupedItems[key].push(item);
      return groupedItems;
    }, {});

    // Convert groups object to array
    const result = Object.keys(groups).map(key => ({
      date: key,
      items: groups[key],
    }));

    // Sort array in reversed chronological order
    result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return result;
  }
}
