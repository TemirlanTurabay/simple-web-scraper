import {CreateEventDto} from './CreateEvent.dto';
import EventModel, {IEvent} from './Event';

class EventService {
    async getEventById(id: string): Promise<IEvent | null> {return await EventModel.findById(id).exec();}
    async getEvents(location: any): Promise<IEvent[]> {const filter = location ? { location: { $regex: new RegExp(`^${location}$`, 'i') } } : {};return await EventModel.find(filter).exec();}
    async filterEvent(attr: string, option: 'asc' | 'desc', location?: string): Promise<IEvent[]> {
        const sortOrder = option === 'asc' ? 1 : -1;
        const regexFilter = location ? { location: { $regex: new RegExp(`^${location}$`, 'i') } } : {};
        return EventModel.find(regexFilter).sort({ [attr]: sortOrder }).exec();
    }
    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
        const {name, description, date, location, duration} = createEventDto;
        const newEvent = new EventModel({
            name,
            description,
            date: new Date(date),
            location,
            duration
        });
        await newEvent.save();
        return newEvent;
    }
}

export default EventService;
  