import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto): Promise<{ token: string }> {
    const { username, email, password } = signUpDto;

    const hashedPassword = bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      email,
      hashedPassword,
    });

    const token = this.jwtService.sign({ _id: user._id });

    return { token };
  }
}
