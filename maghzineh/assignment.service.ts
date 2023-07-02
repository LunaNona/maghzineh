import {Assignment, AssignmentView, ResultList, UserAssignment} from '@/models'
import { BaseApiService } from '../baseApi'

export class AssignmentService extends BaseApiService {
  URL = 'Assignments/'
  async getById(id: number): Promise<AssignmentView> {
    const response = await this.get<AssignmentView>(this.URL + id)
    return response?.data
  }
  
  async getTherapistResult(therapistId: string, daysnum : number): Promise<any> {
    const response = await this.get<any>(this.URL + 'FastAssignments/Report/Therapists/' + therapistId + '?daysNum=' + daysnum)
    return response?.data
  
  }
  async insert(assignment: Assignment): Promise<Assignment> {
    const response = await this.post<Assignment, Assignment>(this.URL, assignment)
    return response?.data
  }

  async insertFastUserAssignment(assignment: Assignment, id: string | undefined): Promise<Assignment> {
    const response = await this.post<Assignment, Assignment>(this.URL+'users/'+id, assignment)
    return response?.data
  }

  async insertUserAssignment(assignment: UserAssignment): Promise<UserAssignment> {
    const response = await this.post<UserAssignment, UserAssignment>(this.URL+'schedules/', assignment)
    return response?.data
  }

  async getFastAssignmentUsage():  Promise<number> {
    const response = await this.get<number>(this.URL+'fastAssignments/usage')
    return response?.data
  }

  async getFastAssignmentResults(userId: string): Promise<ResultList[]> {
    const response = await this.get<ResultList[]>('fastAssignments/users/'+userId)
    return response?.data
  }

}
