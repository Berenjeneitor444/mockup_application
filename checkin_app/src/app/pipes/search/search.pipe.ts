import { Pipe, PipeTransform } from '@angular/core';

/**
 * Search pipe.
 *
 * Given a list of objects, return all elements where any field matches
 * a given query.
 * For queries shorter than 3 chars the entry list is not listed.
 *
 * @param list        An array of elements to filter by query string.
 * @param query       A query to search for.
 * @param min         Query minimum number of characters to trigger the search.
 * @param deepSearch  Whether to look inside words or only from the beginning.
 * @return            Return a list of matching items.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(
    list: any[] | undefined,
    query: string,
    min = 1,
    deepSearch = false
  ): any[] {
    if (!list) {
      return [];
    }

    if (query && query.trim() !== '' && query.length >= min) {
      // Convertir la cadena de búsqueda a minúsculas para una comparación case insensitive
      const lowerCaseQuery = query.toLowerCase();

      // Función recursiva para buscar la cadena en un objeto
      function containsQuery(obj: any): boolean {
        if (obj === null || obj === undefined) {
          return false;
        }

        if (typeof obj === 'object') {
          for (const key in obj) {
            const value = obj[key];

            if (
              typeof value === 'string' &&
              value.toLowerCase().includes(lowerCaseQuery)
            ) {
              return true;
            } else if (
              deepSearch &&
              (typeof value === 'object' || Array.isArray(value))
            ) {
              if (containsQuery(value)) {
                return true;
              }
            }
          }
        } else if (Array.isArray(obj)) {
          for (const item of obj) {
            if (containsQuery(item)) {
              return true;
            }
          }
        } else if (
          typeof obj === 'string' &&
          obj.toLowerCase().includes(lowerCaseQuery)
        ) {
          return true;
        }

        return false;
      }

      /*
      console.log(list, 'search', query);
      // sanitize query and remove accents
      query = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
      // look for any match in any key of type string.
      return list.filter(item =>
        Object.keys(item).some(
          key => {
            let value = item[key];
            if (typeof (value) == 'string' || value instanceof String) {
              value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
              if (deepSearch && typeof (item) == 'object' || item instanceof Object) {
                return this.transform(item, query, min, deepSearch);
              } else if (deepSearch) {
                return item.includes(query);
              } else {
                // split target sentence into words
                let wordsArray = value.split(' ');
                // search at the beginning of each word
                return wordsArray.some((word:any) => word.startsWith(query));
              }
            }
          }
        )
      );
      */
      return list.filter(item => containsQuery(item));
    } else {
      return list;
    }
  }
}
