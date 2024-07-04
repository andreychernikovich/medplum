// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class Observations extends Model {
  static table = 'observations'
 
  @field('created_at') createdAt
  @field('body') body

}
