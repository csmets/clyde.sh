---
title: OOP - Dependency Injection
draft: false
---

# OOP - Dependency Injection

Having to revisit object oriented programming (OOP) after a long break from it
made me go back and study the basics once again. This week I'm going to take a
look into dependency injection.

**The examples given will be in Java but it can translated to other languages.**

There's a lot of examples and tutorials online that cover this topic and it made
me a little confused on the examples given. It's either elaborated too much or
covered too little, however Wikipedia explained it really well:

"Dependency injection is a technique whereby one object supplies the
dependencies of another object. A dependency is an object that can be used (a
service). An injection is the passing of a dependency to a dependent object (a
client) that would use it. The service is made part of the client's state.
Passing the service to the client, rather than allowing a client to build or
find the service, is the fundamental requirement of the pattern."

Ok, so this would be an example where there is no dependency injection:

```
public class EmailService {

    public void sendEmail(String sendTo, String subject, String msg) {
        EmailSuperLib emailer = new EmailSuperLib();
        emailer.send(sendTo, Subject, msg);
    }
}
```

The problem with the above is that it's creating an instance of the
`EmailSuperLib` inside the method. This makes it very hard to unit test as you
won't be able to pass through mock data. It's also not being controlled by the
client thus making it seem like 'magic' and a lot less abstracted. It's not
configurable because logic is kept within the scope of the method. Dependency
inject fixes these issues as well as some others.

Using dependency injection you can do the following:

## Constructor injection
```
public class EmailService {

    EmailSuperLib emailService;

    public EmailService(EmailSuperLib emailer) {
        // Class Constructor
        this.emailService = emailer;
    }

    public void sendEmail(String sendTo, String subject, String msg) {
        this.emailService.send(sendTo, Subject, msg);
    }
}
```

## Setter injection
```
public class EmailService {

    EmailSuperLib emailService;

    public setEmailService(EmailSuperLib emailer) {
        // Setter method
        this.emailService = emailer;
    }

    public void sendEmail(String sendTo, String subject, String msg) {
        this.emailService.send(sendTo, Subject, msg);
    }
}
```

## Interface injection
```
public interface Emailer {

    public void setEmailService(EmailSuperLib emailSuperLib);
}

public class EmailService implements Emailer {

    EmailSuperLib emailService;

    @override
    public setEmailService(EmailSuperLib emailer) {
        // Setter method
        this.emailService = emailer;
    }

    public void sendEmail(String sendTo, String subject, String msg) {
        this.emailService.send(sendTo, Subject, msg);
    }
}
```

As you can see with dependency injection the issues we had before are now
resolved. You're able to easily unit test with mock classes by parsing it
through from the client. It will also make it easier to replace these
dependencies in future rather than digging around to find methods that create an
instance of a class.
