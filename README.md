# Varnish Cache Integration in Backend Project

This README provides comprehensive instructions on how to integrate Varnish Cache into your backend project. By following these steps, you can improve the performance of your application through effective caching strategies.

## 1. Installing Varnish

Varnish Cache can be installed by following one of the methods below, depending on your environment:

- **Generic Installation**: Follow the instructions on the [Varnish Cache official documentation](https://varnish-cache.org/docs/) for various systems.
- **Docker**: If you prefer using Docker, visit [Varnish Docker GitHub repository](https://github.com/varnish/docker-varnish) for setup instructions.
- **MacOS**: For MacOS users, Varnish can be installed via Homebrew. Run the command found on [Homebrew's formulae page](https://formulae.brew.sh/formula/varnish).

## 2. Project Prerequisites

To successfully run this project on your local machine, ensure you have the following prerequisites installed:

- **Docker**: Docker Desktop is required to use the `docker-compose.yml` file for setting up the database environment.
- **Node.js**: The backend project is built with Node.js. Make sure you have Node.js installed on your machine.

## 3. Setting Up the Project

After cloning the project to your local machine, follow these steps to set up the environment:

1. Navigate to the `varnish_project/demo_be` and `varnish_project/demo_be_v2` directories in your terminal and run `npm install` in each to install project dependencies.
2. From the root directory `varnish_project`, run `docker-compose up` to set up and run the PostgresDB container.
3. If you installed Varnish using Homebrew, you can start Varnish by executing the following command in the terminal (make sure to replace `{your/default.vcl/file/path}` with your actual path to the VCL file):

    ```shell
    varnishd -a :8080 -f {your/default.vcl/file/path}
    ```

4. To start the backend application, navigate to the `varnish_project/demo_be` directory and run:

    ```shell
    npm run dev
    ```

5. Similarly, to start the second version of the backend application, go to the `varnish_project/demo_be_v2` directory and execute:

    ```shell
    npm run dev
    ```

## 4. Sending Requests to Varnish

Once everything is set up correctly, you can start making requests to Varnish:

- Access the application through Varnish by sending requests to `localhost:8080/employees`.
- To monitor the requests handled by Varnish, use the `varnishlog` command in the directory where you have Varnish running.

## Useful Links

- [Varnish Cache Official Website](https://varnish-cache.org/): Visit the official website for detailed documentation, guides, and resources about Varnish Cache.
- [Varnish Software YouTube Channel](https://www.youtube.com/@Varnish-software): Explore video tutorials, webinars, and presentations by Varnish Software experts on their YouTube channel.
