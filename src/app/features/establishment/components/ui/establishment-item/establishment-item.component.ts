import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';

import { EstablishmentItem } from '../../../models/EstablishmentItem';

@Component({
  selector: 'app-establishment-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './establishment-item.component.html',
})
export class EstablishmentItemComponent implements OnInit {

  @Input({ required: true }) establishment!: EstablishmentItem

  private readonly _activatedRoute = inject(ActivatedRoute)

  queryParams: Params | null = null

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe({
      next: params => {
        const realizationDate = params['realization'] ?? ''
        const finishDate = params['finish'] ?? ''
        const topicId = params['topic'] ?? ''

        if (realizationDate === '' || finishDate === '') {
          this.queryParams = null
          return
        }

        const searchParams: Params = {
          realization: realizationDate,
          finishDate: finishDate,
        }

        if (topicId !== '') searchParams['topic'] = topicId

        this.queryParams = searchParams
      }
    })
  }
}
