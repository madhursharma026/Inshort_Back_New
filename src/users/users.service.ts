import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...otherDetails } = createUserInput;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...otherDetails,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(username: string) {
    let user: User = await this.userRepository.findOne({
      where: { username: username },
    });
    return user;
  }

  // You can add a method to validate the password during login if needed
  async validatePassword(username: string, password: string): Promise<boolean> {
    const user = await this.findOne(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch;
    }
    return false;
  }
}
