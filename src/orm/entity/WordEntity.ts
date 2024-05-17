import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import WordUserEntity from './WordUserEntity'

@Entity('words')
export default class Word {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ default: false })
    used: Boolean;

    @OneToMany(() => WordUserEntity, (wordUser: WordUserEntity) => wordUser.word)
    wordUser: WordUserEntity[]
}