import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import WordEntity from './WordEntity'

@Entity('words_users')
export default class WordUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unsigned: true })
    wordId: number;

    @Column({type: 'uuid'})
    userId: string;

    @Column({default: 4})
    tries: number;

    @Column({ default: false })
    victory: boolean;

    @ManyToOne(() => WordEntity, (word: WordEntity) => word.id)
    word: WordEntity
}