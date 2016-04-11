package com.chisw;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StreamProjectApplication {



	public static void main(String[] args)
	{

		SpringApplication.run(StreamProjectApplication.class, args);

	}

}


//use when deploy war
/*
@SpringBootApplication
public class StreamProjectApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(StreamProjectApplication.class);
	}

	public static void main(String[] args)
	{

		SpringApplication.run(StreamProjectApplication.class, args);
	}
}

*/
