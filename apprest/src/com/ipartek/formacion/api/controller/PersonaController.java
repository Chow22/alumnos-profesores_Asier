package com.ipartek.formacion.api.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Persona;
import com.ipartek.formacion.model.dao.PersonaDAO;

@Path("/personas")
@Produces("application/json")
@Consumes("application/json")
public class PersonaController {

	private static final Logger LOGGER = Logger.getLogger(PersonaController.class.getCanonicalName());

	private static int id = 1;

	private ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	private Validator validator = factory.getValidator();

	@Context
	private ServletContext context;

	private static ArrayList<Persona> personas = new ArrayList<Persona>();

	static {
		personas.add(new Persona(1, "Arantxa", "avatar1.png", "m"));
		personas.add(new Persona(2, "Idoia", "avatar2.png", "m"));
		personas.add(new Persona(3, "Iker", "avatar3.png", "h"));
		personas.add(new Persona(4, "Hodei", "avatar4.png", "h"));
		id = 5;
	}

	public PersonaController() {
		super();
	}

	@GET
	public ArrayList<Persona> getAll() {
		LOGGER.info("getAll");
		PersonaDAO personaDAO = PersonaDAO.getInstancia();
		// return personas;
		ArrayList<Persona> registros = (ArrayList<Persona>) personaDAO.getAll();
		return registros;
	}

	@POST
	public Response insert(Persona persona) throws Exception {
		LOGGER.info("insert(" + persona + ")");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		// validar pojo
		Set<ConstraintViolation<Persona>> violations = validator.validate(persona);

		if (violations.isEmpty()) {

			PersonaDAO personaDAO = PersonaDAO.getInstancia();

			personaDAO.insert(persona);

			response = Response.status(Status.CREATED).entity(persona).build();

		} else {
			ArrayList<String> errores = new ArrayList<String>();
			for (ConstraintViolation<Persona> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}

			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
		}

		return response;

	}

	@PUT
	@Path("/{id: \\d+}")
	public Response update(@PathParam("id") int id, Persona persona) throws SQLException, Exception {
		LOGGER.info("update(" + id + ", " + persona + ")");
		Response response = Response.status(Status.NOT_FOUND).entity(null).build();

		// validar objeto Persona javax.validation

		Set<ConstraintViolation<Persona>> violations = validator.validate(persona);

		if (violations.isEmpty()) {
			PersonaDAO personaDAO = PersonaDAO.getInstancia();
			personaDAO.update(persona);

		} else {
			ArrayList<String> errores = new ArrayList<String>();
			for (ConstraintViolation<Persona> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}

			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
		}

		return response;

	}

	@DELETE
	@Path("/{id: \\d+}")
	public Response eliminar(@PathParam("id") int id) {
		LOGGER.info("eliminar(" + id + ")");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		Persona persona = null;

		PersonaDAO personaDAO = PersonaDAO.getInstancia();
		try {
			personaDAO.update(persona);
			response = Response.status(Status.OK).entity(persona).build();
		} catch (SQLException e) {
			response = Response.status(Status.OK).entity(persona).build();
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

}
