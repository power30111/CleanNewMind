package practice.demo.Configure;


import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import practice.demo.jwt.JwtAccessDeniedHandler;
import practice.demo.jwt.JwtAuthenticationEntryPoint;
import practice.demo.jwt.TokenProvider;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public static BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        http
                .csrf().disable()

                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                .and()
                .authorizeHttpRequests(request -> {
                            try {
                                request
                                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                                        .requestMatchers("/user/**","/test/**").permitAll()
                                        .anyRequest().authenticated()
                                        .and()
                                        .apply(new JwtSecurityConfig(tokenProvider));
                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                        }
                );


        return http.build();
    }
}
