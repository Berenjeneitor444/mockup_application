import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search.pipe';
import { GroupByDatePipe, GroupByPipe } from './groupby/groupby.pipe';

@NgModule({
  declarations: [SearchPipe, GroupByPipe, GroupByDatePipe],
  imports: [],
  exports: [SearchPipe, GroupByPipe, GroupByDatePipe],
})
export class PipesModule {}
