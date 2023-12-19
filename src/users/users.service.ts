import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const { username, password } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }
}
