import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactFormComponent } from './contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // ── Validación del formulario ────────────────────────────────────────────

  it('el formulario debería ser inválido cuando está vacío', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('debería requerir el campo nombre', () => {
    component.name.setValue('');
    expect(component.name.hasError('required')).toBeTrue();
  });

  it('el nombre debería tener al menos 2 caracteres', () => {
    component.name.setValue('A');
    expect(component.name.hasError('minlength')).toBeTrue();
  });

  it('debería aceptar un nombre válido', () => {
    component.name.setValue('Juan Pérez');
    expect(component.name.valid).toBeTrue();
  });

  it('debería requerir el campo email', () => {
    component.email.setValue('');
    expect(component.email.hasError('required')).toBeTrue();
  });

  it('debería rechazar un email con formato incorrecto', () => {
    component.email.setValue('esto-no-es-un-email');
    expect(component.email.hasError('email')).toBeTrue();
  });

  it('debería aceptar un email válido', () => {
    component.email.setValue('cliente@correo.com');
    expect(component.email.valid).toBeTrue();
  });

  it('el mensaje debería tener al menos 10 caracteres', () => {
    component.details.setValue('Hola');
    expect(component.details.hasError('minlength')).toBeTrue();
  });

  it('debería aceptar un mensaje con suficientes caracteres', () => {
    component.details.setValue('Necesito información sobre perforación de pozos.');
    expect(component.details.valid).toBeTrue();
  });

  it('el formulario debería ser válido con todos los campos correctos', () => {
    component.name.setValue('Juan Pérez');
    component.email.setValue('cliente@correo.com');
    component.details.setValue('Necesito información sobre perforación de pozos.');
    expect(component.form.valid).toBeTrue();
  });

  // ── Comportamiento al enviar ─────────────────────────────────────────────

  it('sendEmail() debería marcar todos los campos como touched si el formulario es inválido', () => {
    expect(component.name.touched).toBeFalse();
    expect(component.email.touched).toBeFalse();
    expect(component.details.touched).toBeFalse();

    component.sendEmail();

    expect(component.name.touched).toBeTrue();
    expect(component.email.touched).toBeTrue();
    expect(component.details.touched).toBeTrue();
  });

  it('sendEmail() no debería enviar si el formulario es inválido', () => {
    expect(component.isSending).toBeFalse();
    component.sendEmail(); // form vacío → inválido
    expect(component.isSending).toBeFalse(); // nunca llegó a isSending = true
  });

  // ── Honeypot anti-spam ───────────────────────────────────────────────────

  it('sendEmail() debería abortar silenciosamente si el honeypot está relleno', () => {
    component.form.get('website')?.setValue('soy-un-bot');
    // Aunque el resto del form sea válido, debe abortar
    component.name.setValue('Bot');
    component.email.setValue('bot@spam.com');
    component.details.setValue('Mensaje de spam automatizado para probar.');

    component.sendEmail();

    expect(component.isSending).toBeFalse();
  });

  it('sendEmail() no debería bloquear si el honeypot está vacío y el form es inválido', () => {
    component.form.get('website')?.setValue('');
    component.sendEmail(); // form inválido → markAllAsTouched
    expect(component.name.touched).toBeTrue();
  });
});
