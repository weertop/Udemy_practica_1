import { TestBed } from '@angular/core/testing';

import { TarjetasCompartidoService } from './tarjetas-compartido.service';

describe('TarjetasCompartidoService', () => {
  let service: TarjetasCompartidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetasCompartidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
