import AppError from '../../../shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: 'foobar',
    });

    expect(appointment.provider_id).toBe('foobar');
  });

  it('should not be able to create two appoinntments on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'foobar',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'foobar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});