export type FormField = {
  label?: string;
  type?: string;
  name?: string;
  baseline?: boolean;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  variant?: string;
  onClick?: () => void;
  sx?: any;
  manifest?: string;
};

export type FormFieldProps = {
  field: FormField;
};

export type User = {
  id: string;
  displayName: string;
  username: string;
  icon?: string;
  profilePicture?: { type: string; data: Uint8Array } | string;
  status?: string;
  phoneNumber?: string;
  email?: string;
  loggedUser?: LoggedInUser;
  online?: boolean | null;
};

export type LoggedInUser = {
  id?: string;
  displayName?: string;
  username?: string;
  icon?: string;
  profilePicture?: string;
  status?: string;
  phoneNumber?: string;
  email?: string;
};

export type NewMessageFieldProps = {
  users: User[];
  onUserSelect: (user: User) => void;
};

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  messageType: string;
  timestamp: string;
};
