import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { SignUpDto, SignInDto } from './dtos';

const USER_ALREADY_EXISTS = 'User already exists with email';
const NO_USER_FOUND = 'No user found';
const INVALID_EMAIL_OR_PASS = 'Invalid email or password';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, email, password } = signUpDto;

    const foundUser = await this.userModel.findOne({
      email,
    });

    if (foundUser) {
      throw new BadRequestException(null, USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      username,
      email,
      hashedPassword,
    });

    const token = this.jwtService.sign({ _id: user._id });

    return { token };
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password }: SignInDto = signInDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException(null, NO_USER_FOUND);
    }

    const isPasswordMatched: boolean = await bcrypt.compare(
      password,
      (user as User).hashedPassword,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException(null, INVALID_EMAIL_OR_PASS);
    }

    const token = this.jwtService.sign({ _id: user._id });

    return { token };
  }

  async check(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    return user;
  }
}
