import { Request, Response } from 'express';
import EventService from './event-service'; 
import {CreateEventDto} from './CreateEvent.dto';

class EventController {
    private eventService: EventService;
    constructor(eventService: EventService) {
        this.eventService = eventService;
    }
    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const event: CreateEventDto = req.body;
            const createdEvent = await this.eventService.createEvent(event);
            res.status(201).json(createdEvent);
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to create event', error: error.message });
        }
    }
    getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            const sortBy = req.query.sortBy as string || 'date';
            const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1; 
            const location = req.query.location as string || null;
            const events = await this.eventService.getEvents({
                page, 
                limit, 
                sortBy, 
                sortDirection, 
                location
            });
            res.status(200).json(events);
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to retrieve events', error: error.message });
        }
    }
    getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
            const event = await this.eventService.getEventById(req.params.id);
            if (!event) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }
            res.status(200).json(event);
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to retrieve event', error: error.message });
        }
    }
}

export default EventController;
