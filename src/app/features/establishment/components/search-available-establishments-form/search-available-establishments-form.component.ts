import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiTopicService } from '../../../topic/services/api-topic.service';

import { TextFieldComponent } from '../../../../components/text-field/text-field.component';
import { SelectFieldComponent } from '../../../../components/select-field/select-field.component';

import { searchAvailableEstablishmentsFormGroup } from '../../forms/searchAvailableEstablishmentsFormGroup';

@Component({
  selector: 'app-search-available-establishments-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextFieldComponent,
    SelectFieldComponent
  ],
  templateUrl: './search-available-establishments-form.component.html',
})
export class SearchAvailableEstablishmentsFormComponent implements OnInit {

  private readonly _apiTopicService = inject(ApiTopicService)
  private readonly _router = inject(Router)
  private readonly _activatedRoute = inject(ActivatedRoute)

  searchAvailableEstablishmentsForm = searchAvailableEstablishmentsFormGroup

  topics$ = this._apiTopicService.getAllTopics()
  isSearched = false

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe({
      next: params => {
        const realizationDate = params['realization'] ?? ''
        const finishDate = params['finish'] ?? ''

        if (realizationDate === '' || finishDate === '') return

        const topicId = params['topic'] ?? ''

        this.finishDate.setValue(finishDate)
        this.realizationDate.setValue(realizationDate)
        this.topicId.setValue(topicId)
      }
    })
  }

  onSearchSubmit() {
    this.isSearched = true

    if (this.searchAvailableEstablishmentsForm.invalid) return;

    this.isSearched = false

    const searchFormValue = this.searchAvailableEstablishmentsForm.value

    const queryParams: Params = {
      realization: searchFormValue.realizationDate,
      finish: searchFormValue.finishDate,
    }

    if (searchFormValue.topicId !== '')
      queryParams['topic'] = searchFormValue.topicId

    this._router.navigate([''], { queryParams })
  }

  onClearForm() {
    this.searchAvailableEstablishmentsForm.reset({
      realizationDate: '',
      finishDate: '',
      topicId: ''
    }, {
      emitEvent: false
    })

    this._router.navigate([''])
  }

  get hasSearchParams(): boolean {
    return this.realizationDate.value !== '' || this.finishDate.value !== '' || this.topicId.value !== ''
  }

  get realizationDate() {
    return this.searchAvailableEstablishmentsForm.controls.realizationDate
  }

  get finishDate() {
    return this.searchAvailableEstablishmentsForm.controls.finishDate
  }

  get topicId() {
    return this.searchAvailableEstablishmentsForm.controls.topicId
  }
}
